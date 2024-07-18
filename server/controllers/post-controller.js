const DataService = require('../service/data-service')
const PostService = require('../service/post-service')
const userService = require('../service/user-service')

class PostController {
  async createPost(req, res, next) {
    console.log('createPost', req.body)
    console.log('req.file===', req.file)
    try {
      DataService.upload(req, res, async (err) => {
        console.log('createPost---------', req.body)
        console.log('creq.file---------', req.file)
        if (err) {
          return next(err)
        }
        if (!req.file) {
          console.log('req.body---------', req.body)
          const post = await PostService.createPost(req.body)
          await DataService.createFile(
            post.id,
            'empty.png',
            'image.png',
            'empty.png',
          )
          return res.json(post)
        }
        const post = await PostService.createPost(req.body)

        await DataService.createFile(
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

  async getPosts(req, res, next) {
    try {
      const limit = 20
      const offset = 0
      const posts = await PostService.getLimitPosts(limit, offset)
      const postsWithFiles = await Promise.all(
        posts.map(async (post) => {
          const file = await DataService.getFileByPostId(post._id.toHexString())
          const user = await userService.getUserById(post.author.toHexString())
          return {
            _id: post._doc._id,
            title: post._doc.title,
            content: post._doc.content,
            publicationDate: post._doc.publicationDate,

            file,
            user: user.email,
          }
        }),
      )
      return res.json(postsWithFiles)
    } catch (error) {
      next(error)
    }
  }

  async editPost(req, res, next) {
    try {
      const id = { _id: req.params.id }
      DataService.upload(req, res, async (err) => {
        if (err) {
          return next(err)
        }
        if (!req.file) {
          const post = await PostService.editPost(id, req.body)
          return res.json(post)
        }
        const post = await PostService.editPost(id, req.body)
        const file = await DataService.getFileByPostId(req.params.id)
        await DataService.deleteFile({ fileName: file })
        await DataService.createFile(
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

  async deleteOnePost(req, res, next) {
    try {
      const file = await DataService.getFileByPostId(req.body)
      await PostService.deletePost(req.body)
      await DataService.deleteFile({ fileName: file })
      return res.sendStatus(200)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = new PostController()
