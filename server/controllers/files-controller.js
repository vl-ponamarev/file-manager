const FileService = require('../service/file-service')
const userService = require('../service/user-service')

class FilesController {
  async saveFiles(req, res, next) {
    try {
      FileService.upload(req, res, async (err) => {
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
        const result = await FileService.createFiles(fileDocs)
        return res.json(result)
      })
    } catch (error) {
      next(error)
    }
  }

  async getFiles(req, res, next) {
    try {
      const files = await FileService.getFiles()
      return res.json(files)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      const id = { _id: req.params.id }
      FileService.upload(req, res, async (err) => {
        if (err) {
          return next(err)
        }
        if (!req.file) {
          const post = await PostService.editPost(id, req.body)
          return res.json(post)
        }
        const post = await PostService.editPost(id, req.body)
        const file = await FileService.getFileByPostId(req.params.id)
        await FileService.deleteFile({ fileName: file })
        await FileService.createFile(
          post.id,
          req.file.filename,
          req.file.mimetype,
          req.file.originalname,
        )
        return res.json(post)
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteFiles(req, res, next) {
    try {
      console.log('req.body------>>>>>>>', req.body)
      await FileService.deleteFiles(req.body)
      return res.sendStatus(200)
    } catch (e) {
      next(e)
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await FileService.downloadFile(req.params.fileId, res)
      res.download(file)
    } catch (e) {
      next(e)
    }
  }
}
module.exports = new FilesController()
