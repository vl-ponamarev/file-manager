const multer = require('multer')
const fs = require('fs')
const util = require('util')
const unlinkAsync = util.promisify(fs.unlink)
const path = require('path')

const FileModel = require('../models/file-model')
const FilesStoreModel = require('../models/files-store-model')
const FolderModel = require('../models/folders-model')

class DataService {
  storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, process.env.UPLOAD_URL)
    },
    // filename: (req, file, cb) => {
    //   cb(null, `${Date.now()}-${file.originalname}`);
    // },
    filename: (req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
      const extension = file.originalname.split('.').pop()
      cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
    },
  })

  // upload = multer({ storage: this.storage }).single('mediacontent')
  upload = multer({ storage: this.storage }).array('mediacontent', 50)

  async getFiles() {
    try {
      const files = await FilesStoreModel.find()
      console.log('files-------->>>>>--------', files)
      return files
    } catch (error) {
      throw new Error(`Failed to get files: ${error.message}`)
    }
  }

  async getFilesByFolderId(folderId) {
    try {
      const files = await FilesStoreModel.find({ folderId })
      console.log('files-------->>>>>--------', files)
      return files
    } catch (error) {
      throw new Error(`Failed to get files: ${error.message}`)
    }
  }

  async createFile(postId, fileName, fileType, originalname) {
    try {
      const file = new FileModel({
        postId,
        fileName,
        fileType,
        originalname,
      })
      await file.save()
      return file
    } catch (error) {
      throw new Error(`Failed to create file: ${error.message}`)
    }
  }
  async getFolders() {
    try {
      const folders = await FolderModel.find()
      return folders
    } catch (error) {
      throw new Error(`Failed to get folders: ${error.message}`)
    }
  }
  async createFolder(folder) {
    try {
      const result = await FolderModel.create(folder)
      return {
        success: true,
        message: 'Folder created successfully',
        data: result,
      }
    } catch (error) {
      return {
        success: false,
        error: 'Error saving folder to database',
        error: error,
      }
    }
  }

  async editFolder(folderId, folderData) {
    try {
      const post = await FolderModel.findByIdAndUpdate(folderId, folderData, {
        new: true,
        returnOriginal: false,
      })
      return post
    } catch (err) {
      return { success: false, error: 'Error editing folder in database', err }
    }
  }

  async deleteFolders(foldersId) {
    const { data } = foldersId
    try {
      const res = await FolderModel.deleteMany({ _id: { $in: data } })
      data.forEach(async (folderId) => {
        const filesToDelete = await this.getFilesByFolderId(folderId)
        const res = await this.deleteFiles({ data: filesToDelete })
        console.log('res', res)
      })
      return res
    } catch (err) {
      return { success: false, error: 'Error deleting folder in database', err }
    }
  }

  async downloadFile(fileId, res) {
    try {
      const file = await FilesStoreModel.findOne({ fileId })
      if (file) {
        const { filename } = file
        const filePath = path.join(UPLOAD_DIR, filename)
        res.sendFile(filePath, (err) => {
          if (err) {
            if (err.code === 'ENOENT') {
              console.log('File not found', err)
              // Файл не найден
              // res.status(404).send('File not found')
            } else {
              console.log('File not found ===>>>>', err)
              // Другая ошибка сервера
              // res.status(500).send('Error sending file')
            }
          }
        })
      }
    } catch (error) {
      throw new Error(`Failed to download file: ${error.message}`)
    }
  }

  async deleteFiles(files) {
    const { data } = files
    try {
      const filesToDelete = await FilesStoreModel.find({
        _id: { $in: data },
      })

      const deletePromises = filesToDelete.map((file) =>
        unlinkAsync(file.path).catch((err) =>
          console.error(`Failed to delete file: ${file.path}`, err),
        ),
      )
      await Promise.all(deletePromises)

      await FilesStoreModel.deleteMany({
        _id: { $in: data },
      })
    } catch (err) {
      console.error(err)
      throw new Error(`Failed to delete files: ${err.message}`)
    }
  }
}

module.exports = new DataService()
