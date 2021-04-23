const db = require('../services/db')

class Post {
  static postTableName = 'Posts'
  static friendTableName = 'Friend_relationship'
  static userTableName = 'Users'
  static avatarTableName = 'Avatars'
  static commentTableName = 'Post_comments'

  async getPostsData(limit, offset, user_id) {
    const friendsPosts = db
      .select('post_id')
      .from(Post.friendTableName)
      .join(
        Post.postTableName,
        `${Post.postTableName}.user_id`,
        '=',
        `${Post.friendTableName}.friend_id`
      )
      .where(`${Post.friendTableName}.user_id`, user_id)
      .andWhere(`${Post.friendTableName}.is_friend`, true)
      .andWhere(`${Post.postTableName}.access`, 'friends')

    return db
      .select(`${Post.postTableName}.*`, 'first_name', 'last_name', 'path')
      .count('comment_id as comments_number')
      .from(Post.postTableName)
      .leftJoin(
        Post.userTableName,
        `${Post.postTableName}.user_id`,
        '=',
        `${Post.userTableName}.user_id`
      )
      .leftJoin(
        Post.avatarTableName,
        `${Post.postTableName}.user_id`,
        '=',
        `${Post.avatarTableName}.user_id`
      )
      .leftJoin(Post.commentTableName, function () {
        this.on(
          `${Post.commentTableName}.post_id`,
          '=',
          `${Post.postTableName}.post_id`
        ).onNull('parent_comment_id')
      })
      .where(`${Post.postTableName}.user_id`, user_id)
      .orWhere(`${Post.postTableName}.access`, 'all')
      .orWhereIn(`${Post.postTableName}.post_id`, friendsPosts)
      .groupBy(
        `${Post.postTableName}.post_id`,
        `${Post.userTableName}.user_id`,
        `${Post.avatarTableName}.path`
      )
      .orderBy(`${Post.postTableName}.creation_date`, 'desc')
      .limit(limit)
      .offset(offset)
  }

  async getPost(id) {
    return db(Post.postTableName).select('*').where('post_id', id).first()
  }

  async updatePost({ id, title, content, access, edit_date }) {
    return db(Post.postTableName)
      .where('post_id', id)
      .update({
        title: title,
        content: content,
        edit_date: edit_date,
        access: access,
      })
      .returning('*')
  }

  async getPostsCount(user_id) {
    const friendsPosts = db
      .select('post_id')
      .from(Post.friendTableName)
      .join(
        Post.postTableName,
        `${Post.postTableName}.user_id`,
        '=',
        `${Post.friendTableName}.friend_id`
      )
      .where(`${Post.friendTableName}.user_id`, user_id)
      .andWhere(`${Post.friendTableName}.is_friend`, true)
      .andWhere(`${Post.postTableName}.access`, 'friends')

    return db(Post.postTableName)
      .count()
      .where('user_id', user_id)
      .orWhere('access', 'all')
      .orWhereIn('post_id', friendsPosts)
      .first()
  }

  async deletePost(id) {
    return db(Post.postTableName).where('post_id', id).del()
  }

  async createPost({
    title,
    content,
    user_id,
    creation_date,
    edit_date,
    access,
  }) {
    return db(Post.postTableName)
      .insert({
        title: title,
        content: content,
        user_id: user_id,
        creation_date: creation_date,
        edit_date: edit_date,
        access: access,
      })
      .returning('*')
  }
}

module.exports = new Post()
