const Post = require('../models/Post')
const File = require('../models/File')
const fs = require('fs').promises
const { as } = require('./db')

const getPosts = async (limit, offset, user_id) => {
  const posts = await Post.getPostsData(limit, offset, user_id)

  for (let post of posts) {
    post.filesData = await File.getFileData(post.post_id)
  }

  const { count } = await Post.getPostsCount(user_id)

  return {
    data: posts,
    meta: {
      total: count,
    },
  }
}

const getPost = async (post_id) => {
  const post = await Post.getPost(post_id)
  post.filesData = await File.getFileData(post_id)
  return post
}

const deletePost = async (id) => {
  const filesData = await File.deleteFile(id)

  for (let data of filesData) {
    await fs.unlink(`${config.get('FILE_PATH')}\\${data.path}`)
  }

  await Post.deletePost(id)
}

const updatePost = async (data, post_id) => {
  const date = new Date()
  const post = await Post.updatePost({ ...data, id: post_id, edit_date: date })
  return post
}

const createPost = async (data, files, user_id) => {
  const date = new Date()
  const newPost = (
    await Post.createPost({
      ...data,
      creation_date: date,
      edit_date: date,
      user_id,
    })
  )[0]

  if (files) {
    for (let file of files) {
      await File.addFile({ ...file, user_id, post_id: newPost.post_id })
    }
  }
}

module.exports = {
  getPost,
  getPosts,
  deletePost,
  createPost,
  updatePost,
}
