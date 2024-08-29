const multer = require('multer')
const fs = require('fs')
const util = require('util')
const unlinkAsync = util.promisify(fs.unlink)
const path = require('path')
const { ObjectId } = require('mongodb');
const FilesStoreModel = require('../models/files-store-model');
const FolderModel = require('../models/folders-model');

class DataService {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.UPLOAD_URL);
    },
    // filename: (req, file, cb) => {
    //   cb(null, `${Date.now()}-${file.originalname}`);
    // },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const extension = file.originalname.split('.').pop();
      cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
    },
  });

  // upload = multer({ storage: this.storage }).single('mediacontent')
  upload = multer({ storage: this.storage }).array('mediacontent', 50);

  async getFiles() {
    try {
      const files = await FilesStoreModel.find();
      return files;
    } catch (error) {
      throw new Error(`Failed to get files: ${error.message}`);
    }
  }

  async getFilesByFolderId(folderId) {
    try {
      const files = await FilesStoreModel.find({ folderId });
      return files;
    } catch (error) {
      throw new Error(`Failed to get files: ${error.message}`);
    }
  }

  async createMultipleFiles(files) {
    try {
      const savedFiles = await FilesStoreModel.insertMany(files);
      return savedFiles;
    } catch (error) {
      throw new Error(`Failed to create files: ${error.message}`);
    }
  }
  async getFolders() {
    try {
      const folders = await FolderModel.find();
      return folders;
    } catch (error) {
      throw new Error(`Failed to get folders: ${error.message}`);
    }
  }
  async createFolder(folder) {
    try {
      const result = await FolderModel.create(folder);
      return {
        success: true,
        message: 'Folder created successfully',
        data: result,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error saving folder to database',
        error: error,
      };
    }
  }

  async editFolder(folderId, folderData) {
    try {
      const post = await FolderModel.findByIdAndUpdate(
        folderId,
        { foldername: folderData },
        {
          new: true,
          returnOriginal: false,
        },
      );
      return post;
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err };
    }
  }

  async editFile(fileId, fileData) {
    try {
      const post = await FilesStoreModel.findByIdAndUpdate(
        fileId,
        { originalname: fileData },
        {
          new: true,
          returnOriginal: false,
        },
      );
      return post;
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err };
    }
  }

  async moveItems(data) {
    console.log('--->>>> data:', JSON.stringify(data, null, 2)); // Pretty-printing the data

    try {
      const folders = data.data?.items?.folders;
      const files = data.data?.items?.files;

      if (Array.isArray(folders)) {
        console.log('data.data.items.folders:', folders); // Log the actual array
        const foldersIds = folders.map(id => ObjectId.createFromHexString(id));
        console.log('foldersIds////////', foldersIds);

        const filesIds = files.map(id => new ObjectId(id));
        const filesFilter = { _id: { $in: files } };

        const foldersResult = await FolderModel.updateMany(
          { _id: { $in: foldersIds } },
          { $set: { rootFolderId: data.data?.rootFolderId } },
        );

        const filesResult = await FilesStoreModel.updateMany(filesFilter, {
          $set: { folderId: data.data?.rootFolderId },
        });
        console.log(`${foldersResult.matchedCount} documents matched the filter`);

        return { foldersResult, filesResult };
      } else {
        console.log('data.data.items.folders is not an array or is undefined');
      }
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err };
    }
  }

  async copyItems(data) {
    console.log('--->>>> data:', JSON.stringify(data, null, 2));
    try {
      const folders = data.data?.items?.folders;
      const files = data.data?.items?.files;
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err };
    }
  }

  async deleteFolders(foldersId) {
    try {
      const res = await FolderModel.deleteMany({ _id: { $in: foldersId } });

      for (const folderId of foldersId) {
        const filesToDelete = await this.getFilesByFolderId(folderId);
        await this.deleteFiles({ data: filesToDelete });

        const nestedFolders = await FolderModel.find({ rootFolderId: folderId });
        await this.deleteFolders({
          data: nestedFolders.map(folder => folder._id),
        });
      }

      return res;
    } catch (err) {
      return { success: false, error: 'Error deleting folder in database', err };
    }
  }

  async downloadFile(fileId, res) {
    try {
      const file = await FilesStoreModel.findOne({ fileId });
      if (file) {
        const { filename } = file;
        const filePath = path.join(UPLOAD_DIR, filename);
        res.sendFile(filePath, err => {
          if (err) {
            if (err.code === 'ENOENT') {
              console.log('File not found', err);
              // Файл не найден
              res.status(404).send('File not found');
            } else {
              console.log('File not found ===>>>>', err);
              // Другая ошибка сервера
              res.status(500).send('Error sending file');
            }
          }
        });
      }
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  async deleteFiles(files) {
    try {
      const filesToDelete = await FilesStoreModel.find({
        _id: { $in: files },
      });

      const deletePromises = filesToDelete.map(async file => {
        try {
          await unlinkAsync(`${process.env.UPLOAD_URL}/${file.filename}`);
          console.log(`File deleted: ${file.filename}`);
        } catch (err) {
          console.error(`Failed to delete file: ${file.filename}`, err);
        }
      });
      await Promise.all(deletePromises);

      const res = await FilesStoreModel.deleteMany({
        _id: { $in: files },
      });

      console.log('Result:', res);

      return {
        status: 'OK',
        message: 'Files deleted successfully',
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to delete files: ${err.message}`);
    }
  }
}

module.exports = new DataService();
