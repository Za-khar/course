const { orderBy } = require('../services/db')
const db = require('../services/db')

class Friend {
  static friendsTableName = 'Friend_relationship'
  static userTableName = 'Users'
  static avatarTableName = 'Avatars'

  async getFriendsByUserId(user_id) {
    return db
      .select(
        `${Friend.friendsTableName}.user_id as current_user_id`,
        'friend_id',
        'first_name',
        'last_name',
        'path'
      )
      .from(Friend.friendsTableName)
      .leftJoin(
        Friend.userTableName,
        `${Friend.userTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.friend_id`
      )
      .leftJoin(
        Friend.avatarTableName,
        `${Friend.avatarTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.friend_id`
      )
      .where(`${Friend.friendsTableName}.user_id`, user_id)
      .andWhere('is_friend', true)
      .orderBy('request_date', 'desc')
  }

  async getIncomingRequestsByUserId(user_id) {
    return db
      .select(
        'friend_id as current_user_id',
        `${Friend.friendsTableName}.user_id as friend_id`,
        'first_name',
        'last_name',
        'path'
      )
      .from(Friend.friendsTableName)
      .leftJoin(
        Friend.userTableName,
        `${Friend.userTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.user_id`
      )
      .leftJoin(
        Friend.avatarTableName,
        `${Friend.avatarTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.user_id`
      )
      .where(`${Friend.friendsTableName}.friend_id`, user_id)
      .andWhere('is_friend', false)
      .orderBy('request_date', 'desc')
  }

  async getOutgoingRequestsByUserId(user_id) {
    return db
      .select(
        `${Friend.friendsTableName}.user_id as current_user_id`,
        'friend_id',
        'first_name',
        'last_name',
        'path'
      )
      .from(Friend.friendsTableName)
      .leftJoin(
        Friend.userTableName,
        `${Friend.userTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.friend_id`
      )
      .leftJoin(
        Friend.avatarTableName,
        `${Friend.avatarTableName}.user_id`,
        '=',
        `${Friend.friendsTableName}.friend_id`
      )
      .where(`${Friend.friendsTableName}.user_id`, user_id)
      .andWhere('is_friend', false)
      .orderBy('request_date', 'desc')
  }

  async checkRequest(user_id, friend_id) {
    return db(Friend.friendsTableName)
      .select('*')
      .where({ user_id: user_id, friend_id: friend_id })
      .first()
  }

  async checkUser(user_id) {
    return db(Friend.userTableName)
      .select('*')
      .where('user_id', user_id)
      .first()
  }

  async isFriend(user_id, friend_id) {
    return db(Friend.friendsTableName)
      .select('is_friend')
      .where({
        user_id: user_id,
        friend_id: friend_id,
      })
      .first()
  }

  async addRequest(user_id, friend_id, is_friend, date) {
    return db(Friend.friendsTableName).insert({
      user_id: user_id,
      friend_id: friend_id,
      is_friend: is_friend,
      request_date: date,
    })
  }

  async searchUserByName(searchField, user_id) {
    return db
      .select(
        `${Friend.userTableName}.user_id as friend_id`,
        'first_name',
        'last_name',
        'path'
      )
      .from(Friend.userTableName)
      .leftJoin(
        Friend.avatarTableName,
        `${Friend.avatarTableName}.user_id`,
        '=',
        `${Friend.userTableName}.user_id`
      )
      .whereNot(`${Friend.userTableName}.user_id`, user_id)
      .andWhere(function () {
        this.where(`${Friend.userTableName}.first_name`, searchField).orWhere(
          `${Friend.userTableName}.last_name`,
          searchField
        )
      })
  }

  async deleteRequest(user_id, friend_id) {
    return db(Friend.friendsTableName)
      .where({ user_id: user_id, friend_id: friend_id })
      .del()
  }

  async updateRequest(user_id, friend_id, is_friend, date) {
    return db(Friend.friendsTableName)
      .update({
        is_friend: is_friend,
        request_date: date,
      })
      .where({
        user_id: user_id,
        friend_id: friend_id,
      })
  }
}

module.exports = new Friend()
