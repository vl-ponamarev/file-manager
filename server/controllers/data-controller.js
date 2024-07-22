const DataService = require('../service/data-service')
const userService = require('../service/user-service')

class DataController {
  async saveFiles(req, res, next) {
    try {
      DataService.upload(req, res, async (err) => {
        if (err) {
          return next(err)
        }
        const files = req.files
        const owner = req.body.owner

        console.log('files-------->>>>>--------', files)
        const fileDocs = files?.map((file) => ({
          owner,
          filename: file.filename,
          path: file.path,
          mimetype: file.mimetype,
          size: file.size,
        }))
        const result = await DataService.createFiles(fileDocs)
        return res.json(result)
      })
    } catch (error) {
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const files = await DataService.getFiles()
      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async getFilesByFolderId(req, res, next) {
    const folderId = req.params.folderId

    try {
      const files = await DataService.getFilesByFolderId()
      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async getFolders(req, res, next) {
    try {
      const folders = await DataService.getFolders()
      return res.json(folders)
    } catch (error) {
      next(error)
    }
  }

  async createFolder(req, res, next) {
    try {
      const response = await DataService.createFolder(req.body)
      console.log('response', response)
      return res.json(response)
    } catch (error) {
      next(error)
    }
  }

  async editFolder(req, res, next) {
    try {
      const id = { _id: req.params.id }
      const post = await DataService.editFolder(id, req.body)
      return res.json(post)
    } catch (error) {
      next(error)
    }
  }

  async deleteFolders(req, res, next) {
    try {
      await DataService.deleteFolders(req.body)
      return res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  }

  async deleteFiles(req, res, next) {
    try {
      await DataService.deleteFiles(req.body)
      return res.sendStatus(200)
    } catch (e) {
      next(e)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await DataService.downloadFile(req.params.fileId, res)
      res.download(file)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new DataController()
