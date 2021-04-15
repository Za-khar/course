const db = require('../services/db')

class Token {
  static tokenTableName = 'Refresh_tokens'

  async saveRefreshToken({ user_id, expires, refreshToken }) {
    return db(Token.tokenTableName)
      .insert({
        user_id: user_id,
        expires: expires,
        refresh_token: refreshToken,
      })
      .returning('*')
  }

  async deleteRefreshToken({ refreshToken, user_id }) {
    return db(Token.tokenTableName)
      .where({ refresh_token: refreshToken, user_id: user_id })
      .del()
  }

  async findRefreshToken({ refreshToken, user_id }) {
    return db(Token.tokenTableName)
      .select('*')
      .where({ refresh_token: refreshToken, user_id: user_id })
      .first()
  }
}

module.exports = new Token()
