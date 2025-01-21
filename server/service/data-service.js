const multer = require('multer')
const fs = require('fs')
const util = require('util')
const unlinkAsync = util.promisify(fs.unlink)
const path = require('path')
const { ObjectId } = require('mongodb');
const FilesStoreModel = require('../models/files-store-model');
const FolderModel = require('../models/folders-model');
const archiver = require('archiver');

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
    try {
      const folders = data.data?.items?.folders;
      const files = data.data?.items?.files;

      if (Array.isArray(folders)) {
        const foldersIds = folders.map(id => ObjectId.createFromHexString(id));
        const filesIds = files.map(id => new ObjectId(id));
        const filesFilter = { _id: { $in: files } };

        const foldersResult = await FolderModel.updateMany(
          { _id: { $in: foldersIds } },
          { $set: { rootFolderId: data.data?.rootFolderId } },
        );

        const filesResult = await FilesStoreModel.updateMany(filesFilter, {
          $set: { folderId: data.data?.rootFolderId },
        });
        return { foldersResult, filesResult };
      } else {
        console.error('data.data.items.folders is not an array or is undefined');
      }
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err };
    }
  }

  async copyItems(data) {
    try {
      const { folders: folderIds, files: fileIds } = data.data?.items || {};
      const newRootFolderId = data.data?.rootFolderId || {};
      async function copyFolder(folderId, newRootFolderId) {
        const folder = await FolderModel.findById(folderId);
        if (!folder) return null;
        // Создание новой папки с новым rootFolderId
        const newFolder = await FolderModel.create({
          ...folder.toObject(),
          _id: undefined,
          rootFolderId: newRootFolderId,
        });
        // Копирование вложенных файлов
        const files = await FilesStoreModel.find({ folderId });
        for (const file of files) {
          await FilesStoreModel.create({
            ...file.toObject(),
            _id: undefined,
            folderId: newFolder._id,
          });
        }
        // Копирование вложенных папок (рекурсивно)
        const nestedFolders = await FolderModel.find({ rootFolderId: folder._id });
        for (const nestedFolder of nestedFolders) {
          await copyFolder(nestedFolder._id, newFolder._id);
        }

        return newFolder;
      }

      // Копирование папок
      for (const folderId of folderIds) {
        await copyFolder(folderId, newRootFolderId);
      }
      // Копирование файлов
      for (const fileId of fileIds) {
        const file = await FilesStoreModel.findById(fileId);
        if (file) {
          await FilesStoreModel.create({
            ...file.toObject(),
            _id: undefined,
            folderId: newRootFolderId,
          });
        }
      }

      return { success: true };
    } catch (err) {
      console.error(err);
      return { success: false, error: 'Error copying items in database', err };
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

  async deleteFiles(files) {
    try {
      const filesToDelete = await FilesStoreModel.find({
        _id: { $in: files },
      });

      const deletePromises = filesToDelete.map(async file => {
        try {
          await unlinkAsync(`${process.env.UPLOAD_URL}/${file.filename}`);
        } catch (err) {
          console.error(`Failed to delete file: ${file.filename}`, err);
        }
      });
      await Promise.all(deletePromises);

      const res = await FilesStoreModel.deleteMany({
        _id: { $in: files },
      });

      return {
        status: 'OK',
        message: 'Files deleted successfully',
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to delete files: ${err.message}`);
    }
  }

  async downloadFile(fileId, res) {
    try {
      const file = await FilesStoreModel.findOne({ fileId });
      if (file) {
        const { filename } = file;
        const filePath = path.join(process.env.UPLOAD_URL, filename);
        res.sendFile(filePath, err => {
          if (err) {
            if (err.code === 'ENOENT') {
              res.status(404).send('File not found');
            } else {
              res.status(500).send('Error sending file');
            }
          }
        });
      }
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`);
    }
  }

  async download(data, res) {
    const { files, folders } = data;

    try {
      // Создаем временную директорию
      const tempDir = path.join(__dirname, 'temp');
      fs.mkdirSync(tempDir, { recursive: true });

      // Копируем файлы в временную директорию
      if (files && files.length > 0) {
        for (const fileId of files) {
          const file = await FilesStoreModel.findOne({ _id: fileId });
          if (file) {
            const { filename } = file;
            const sourcePath = path.join(process.env.UPLOAD_URL, filename);
            const destPath = path.join(tempDir, filename);

            if (fs.existsSync(sourcePath)) {
              fs.copyFileSync(sourcePath, destPath);
            } else {
              console.warn(`File not found: ${sourcePath}`);
            }
          } else {
            console.warn(`File not found in database: ${fileId}`);
          }
        }
      }

      // Добавляем папки в структуру
      if (folders && folders.length > 0) {
        for (const folderId of folders) {
          await createFolderStructure(folderId, tempDir);
        }
      }

      // Настраиваем ZIP-архиватор
      const archive = archiver('zip', { zlib: { level: 9 } });

      res.attachment(`download.zip`);

      archive.on('error', err => {
        console.error('Archive error:', err);
        throw err;
      });

      archive.pipe(res);

      // Добавляем временную директорию в архив
      archive.directory(tempDir + '/', false);

      await archive.finalize();

      // Удаляем временную директорию после завершения
      fs.rmSync(tempDir, { recursive: true, force: true });
    } catch (error) {
      console.error('Failed to download:', error.message);
      res.status(500).send('Failed to download.');
    }
  }
}

async function createFolderStructure(folderId, parentPath) {
  const folder = await FolderModel.findOne({ _id: folderId });
  if (!folder) return;
  const currentFolderPath = path.join(parentPath, folder.foldername);
  fs.mkdirSync(currentFolderPath, { recursive: true }); // Создаем текущую папку
  // Получаем вложенные папки
  const subFolders = await FolderModel.find({ rootFolderId: folderId });
  for (const subFolder of subFolders) {
    await createFolderStructure(subFolder.id, currentFolderPath); // Рекурсивно создаем вложенные папки
  }
  // Получаем файлы в текущей папке
  const files = await FilesStoreModel.find({ folderId: folder.id });
  for (const file of files) {
    const sourceFilePath = path.join(process.env.UPLOAD_URL, file.filename); // Путь к исходному файлу
    const destinationFilePath = path.join(currentFolderPath, file.filename); // Путь к целевому файлу
    try {
      // Копируем файл из исходного пути в целевой
      fs.copyFileSync(sourceFilePath, destinationFilePath);
    } catch (error) {
      console.error(`Error copying file ${file.filename}:`, error);
    }
  }
}

module.exports = new DataService();
