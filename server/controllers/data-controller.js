const DataService = require('../service/data-service')
const userService = require('../service/user-service')

class DataController {
  async saveFiles(req, res, next) {
    try {
      DataService.upload(req, res, async err => {
        if (err) {
          return next(err);
        }
        const files = req.files;
        const owner = req.body.owner;
        const folder = req.body.folder;

        const fileDocs = files?.map(file => ({
          owner,
          folderId: folder,
          filename: file.filename,
          mimetype: file.mimetype,
          size: file.size,
          originalname: file.originalname,
        }));
        const result = await DataService.createMultipleFiles(fileDocs);
        return res.json(result);
      });
    } catch (error) {
      next(error);
    }
  }

  async getFiles(req, res, next) {
    try {
      const files = await DataService.getFiles();
      return res.json(files);
    } catch (error) {
      next(error);
    }
  }

  async getFilesByFolderId(req, res, next) {
    console.log('req.params.folderId', req.params);
    const folderId = req.params.folderId;

    try {
      const files = await DataService.getFilesByFolderId(folderId);
      return res.json(files);
    } catch (error) {
      next(error);
    }
  }

  async getFolders(req, res, next) {
    try {
      const folders = await DataService.getFolders();
      return res.json(folders);
    } catch (error) {
      next(error);
    }
  }

  async createFolder(req, res, next) {
    try {
      const response = await DataService.createFolder(req.body);
      return res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async editFolder(req, res, next) {
    try {
      const id = { _id: req.params.id };
      const { formData } = req.body;
      console.log('req.body', formData);
      console.log('req.body', req.body);
      const post = await DataService.editFolder(id, formData);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async editFile(req, res, next) {
    try {
      const id = { _id: req.params.id };
      const { formData } = req.body;
      console.log('req.body', formData);
      console.log('req.body', req.body);
      const post = await DataService.editFile(id, formData);
      return res.json(post);
    } catch (error) {
      next(error);
    }
  }

  async deleteFolders(req, res, next) {
    try {
      await DataService.deleteFolders(req.body);
      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  }

  async deleteFiles(req, res, next) {
    try {
      const response = await DataService.deleteFiles(req.body);
      console.log('response', response);
      return res.status(200).json({ message: 'Success', response });
    } catch (e) {
      next(e);
    }
  }

  async downloadFile(req, res, next) {
    try {
      const file = await DataService.downloadFile(req.params.fileId, res);
      res.download(file);
    } catch (e) {
      next(e);
    }
  }

  async moveItems(req, res, next) {
    console.log('===>>>', req.body);

    try {
      const response = await DataService.moveItems(req.body);
      return res.status(200).json({ message: 'Success', response });
    } catch (e) {
      next(e);
    }
  }

  async copyItems(req, res, next) {
    try {
      const response = await DataService.copyItems(req.body);
      return res.status(200).json({ message: 'Success', response });
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new DataController()
