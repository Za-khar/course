const db = require('../services/db');

class User {
  static userTableName = 'Users';
  static socialTableName = 'Social_accounts';
  static async findByLogin(email) {
    return db.select('*').from(User.userTableName).where('email', email).first();
  }

  static async saveUser({ email, hashPassword, userRole }) {
    const date = new Date();
    return db(User.userTableName).insert({ email: email, password: hashPassword, role: userRole, registration_date: date }).returning('*');
  }

  static async checkActive(id) {
    return db.select('active').from(User.userTableName).where('user_id', id).first();
  }

  static async findOne(id) {
    return db.select('*').from(User.userTableName).where('user_id', id).first();
  }

  static async activate(id) {
    return db(User.userTableName).where('user_id', id).update({ active: true }).returning('*');
  }

  static async getRoleByID(id) {
    return db.select('role').from(User.userTableName).where('user_id', id).first();
  }

  static async getUserBySocialAccountID(socialID) {
    const userSoc = await db.select('*').from(User.socialTableName).where('social_account_id', socialID).first();

    if (userSoc) {
      return db.select('*').from(User.userTableName).where('user_id', userSoc.user_id).first();
    }

    return undefined;
  }

  static async saveSocialAccout({ accountID, socialAccoutEmail, userID, provider }) {
    return db(User.socialTableName).insert({ social_account_id: accountID, social_email: socialAccoutEmail, user_id: userID, provider: provider }).returning('*');
  }

  static async getSocialAccountByID({ user_id, provider }) {
    return db.select('*').from(User.socialTableName).where('social_account_id', user_id).andWhere('provider', provider).first();
  }

  static async getSocialAccountByUserID({ id, provider }) {
    return db.select('*').from(User.socialTableName).where('user_id', id).andWhere('provider', provider).first();
  }
}

module.exports = User;
