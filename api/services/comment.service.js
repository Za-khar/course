const Comment = require('../models/Comment')

const getComments = async (post_id) => {
  return await Comment.getCommentsByPostID(post_id)
}

const createComment = async (data) => {
  const date = new Date()
  const comment = (
    await Comment.createComment({
      ...data,
      edit_date: date,
      create_date: date,
    })
  )[0]
  return await Comment.getCommentDataById(comment.comment_id)
}

const getParentComment = async (parent_comment_id) => {
  return await Comment.getParentComment(parent_comment_id)
}

const deleteComment = async ({ comment_id }) => {
  return (await Comment.deleteCommentById(comment_id))[0]
}

const editComment = async (data) => {
  const date = new Date()
  return (
    await Comment.editCommentById({
      comment_id: data.comment_id,
      comment_text: data.comment_text,
      edit_date: date,
    })
  )[0]
}

module.exports = {
  getComments,
  createComment,
  deleteComment,
  editComment,
  getParentComment,
}
