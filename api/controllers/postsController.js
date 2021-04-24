const postService = require('../services/post.service')

class PostsController {
  async createPost(req, res) {
    try {
      const { title, content, access } = req.body
      await postService.createPost(
        { title, content, access },
        req.files,
        req.user.user_id
      )
      res.send({ message: 'post successfully created' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Creation error' })
    }
  }

  async getPosts(req, res) {
    try {
      const limit = req.query.limit || 3
      const offset = req.query.offset || 0
      const result = await postService.getPosts(limit, offset, req.user.user_id)
      res.send(result)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Search error' })
    }
  }

  async getOnePost(req, res) {
    try {
      const id = req.params.id
      const post = await postService.getPost(id)
      res.send({
        data: post,
      })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Search error' })
    }
  }

  async updatePost(req, res) {
    try {
      const { title, content, access } = req.body
      const post = await postService.updatePost(
        { title, content, access },
        req.params.id
      )
      res.send(post)
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Update error' })
    }
  }

  async deletePost(req, res) {
    try {
      await postService.deletePost(req.params.id)
      res.send({ message: 'Post successfully deleted' })
    } catch (e) {
      console.log(e)
      res.status(400).json({ message: 'Deletion error' })
    }
  }
}

module.exports = new PostsController()
