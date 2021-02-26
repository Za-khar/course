const db = require('../services/db');

class User {
  static userTableName = 'Users';
  static socialTableName = 'Social_accounts';

  static async findByLogin(email) {
    return db.select('*').from(User.userTableName).where('email', email).first();
  }

  static async saveUser({email, hashPassword, userRole}) {
    const date = new Date();
      return db(User.userTableName).insert({email: email, password: hashPassword, role: userRole, registration_date: date}).returning('*');
  }

  static async checkActive(id){
      return db.select('active').from(User.userTableName).where('id', id).first();
  }

  static async findOne(id) {
    return db.select('*').from(User.userTableName).where('id', id).first();
  }

  static async activate(id){
    return db(User.userTableName).where('id', id).update({active: true}).returning('*');
  }

  static async getRoleByID(id){
    return db.select('role').from(User.userTableName).where('id', id).first();
  }

  static async getUserBySocialAccountID(socialID){
    const userSoc = await db.select('*').from(User.socialTableName).where('id', socialID).first();

    if(userSoc){
      return db.select('*').from(User.userTableName).where('id', userSoc.user_id).first();
    }

    return undefined;
  }

  static async saveSocialAccout({accountID, socialAccoutEmail, userID, provider}) {
    return db(User.socialTableName).insert({id: accountID, social_email: socialAccoutEmail, user_id: userID, provider: provider}).returning('*');
  }

  static async getSocialAccountByID({id, provider}){
    return db.select('*').from(User.socialTableName).where('id', id).andWhere('provider', provider).first();
  }

  static async getSocialAccountByUserID({id, provider}){
    return db.select('*').from(User.socialTableName).where('user_id', id).andWhere('provider', provider).first();
  }
}

module.exports = User;
