const db = require('../services/db')

class Comment {
  static commentsTableName = 'Post_comments'
  static userTableName = 'Users'
  static avatarTableName = 'Avatars'

  async getCommentsByPostID(post_id) {
    return db
      .select(
        `${Comment.commentsTableName}.*`,
        'first_name',
        'last_name',
        'path'
      )
      .from(Comment.commentsTableName)
      .leftJoin(
        Comment.userTableName,
        `${Comment.commentsTableName}.user_id`,
        '=',
        `${Comment.userTableName}.user_id`
      )
      .leftJoin(
        Comment.avatarTableName,
        `${Comment.avatarTableName}.user_id`,
        '=',
        `${Comment.commentsTableName}.user_id`
      )
      .where('post_id', post_id)
      .orderBy('create_date')
  }

  async getCommentDataById(comment_id) {
    return db
      .select(
        `${Comment.commentsTableName}.*`,
        'first_name',
        'last_name',
        'path'
      )
      .from(Comment.commentsTableName)
      .leftJoin(
        Comment.userTableName,
        `${Comment.commentsTableName}.user_id`,
        '=',
        `${Comment.userTableName}.user_id`
      )
      .leftJoin(
        Comment.avatarTableName,
        `${Comment.avatarTableName}.user_id`,
        '=',
        `${Comment.commentsTableName}.user_id`
      )
      .where('comment_id', comment_id)
      .first()
  }

  async createComment({
    comment_text,
    post_id,
    user_id,
    parent_comment_id,
    edit_date,
    create_date,
  }) {
    return db(Comment.commentsTableName)
      .insert({
        comment_text: comment_text,
        post_id: post_id,
        user_id: user_id,
        parent_comment_id: parent_comment_id,
        edit_date: edit_date,
        create_date: create_date,
      })
      .returning('*')
  }

  async deleteCommentById(comment_id) {
    return db(Comment.commentsTableName)
      .where('comment_id', comment_id)
      .del(['comment_id', 'post_id'])
  }

  async getParentComment(comment_id) {
    return db(Comment.commentsTableName)
      .select('parent_comment_id')
      .where('comment_id', comment_id)
      .first()
  }

  async editCommentById({ comment_id, comment_text, edit_date }) {
    return db(Comment.commentsTableName)
      .update({ comment_text: comment_text, edit_date: edit_date })
      .where('comment_id', comment_id)
      .returning('*')
  }
}

module.exports = new Comment()
