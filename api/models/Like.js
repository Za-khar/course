const db = require('../services/db')

class Like {
  static likesTableName = 'Likes'
  static userTableName = 'Users'
  static avatarTableName = 'Avatars'

  async getLikesByPostId(post_id) {
    return db
      .select(`${Like.likesTableName}.*`, 'last_name', 'first_name', 'path')
      .from(Like.likesTableName)
      .leftJoin(
        Like.userTableName,
        `${Like.userTableName}.user_id`,
        '=',
        `${Like.likesTableName}.user_id`
      )
      .leftJoin(
        Like.avatarTableName,
        `${Like.avatarTableName}.user_id`,
        '=',
        `${Like.likesTableName}.user_id`
      )
      .where('post_id', post_id)
  }

  async getLikeData(post_id, user_id) {
    return db
      .select(`${Like.likesTableName}.*`, 'last_name', 'first_name', 'path')
      .from(Like.likesTableName)
      .leftJoin(
        Like.userTableName,
        `${Like.userTableName}.user_id`,
        '=',
        `${Like.likesTableName}.user_id`
      )
      .leftJoin(
        Like.avatarTableName,
        `${Like.avatarTableName}.user_id`,
        '=',
        `${Like.likesTableName}.user_id`
      )
      .where(`${Like.likesTableName}.user_id`, user_id)
      .andWhere(`${Like.likesTableName}.post_id`, post_id)
      .first()
  }

  async checkLike(post_id, user_id) {
    return db(Like.likesTableName)
      .select('*')
      .where({
        user_id: user_id,
        post_id: post_id,
      })
      .first()
  }

  async deleteLike(post_id, user_id) {
    return db(Like.likesTableName)
      .where({ user_id: user_id, post_id: post_id })
      .del(['user_id', 'post_id'])
  }

  async createLike(post_id, user_id) {
    return db(Like.likesTableName)
      .insert({
        post_id: post_id,
        user_id: user_id,
      })
      .returning('*')
  }
}

module.exports = new Like()
