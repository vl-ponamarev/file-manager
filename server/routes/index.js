const Router = require('express')
const { body } = require('express-validator')
const userController = require('../controllers/user-controller')

const router = new Router()

const authMiddleware = require('../middlewares/auth-middleware')
const postController = require('../controllers/post-controller')
const dataController = require('../controllers/data-controller')

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 3, max: 32 }),
  userController.registration,
)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddleware, userController.getUsers)

router.post('/create-post', postController.createPost)

router.get('/posts', authMiddleware, postController.getPosts)
router.put('/posts/:id', postController.editPost)
router.delete('/delete', postController.deleteOnePost)

router.delete('/delete-files', dataController.deleteFiles)
router.post('/save-files', dataController.saveFiles)
router.get('/download-file/:fileId', dataController.downloadFile)
router.get('/get-files', dataController.getFiles)
router.get('/files/:folderId', dataController.getFilesByFolderId)

router.post('/create-folder', dataController.createFolder)
router.get('/get-folders', dataController.getFolders)
router.put('/folders/:id', dataController.editFolder)
router.delete('/folders', dataController.deleteFolders)

module.exports = router
