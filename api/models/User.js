const db = require('../services/db');

class User {
  static userTableName = 'users';
  static socialTableName = 'social_account';
  static providerTable = 'providers';

  static async findByLogin(email) {
    return db.select('*').from(User.userTableName).where('email', email).first();
  }

  static async saveUser({email, hashPassword, userRole}) {
      return db(User.userTableName).insert({email: email, password: hashPassword, role: userRole}).returning('*');
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
    const userSoc = await db.select('*').from(User.socialTableName).where('accountID', socialID).first();

    if(userSoc){
      return db.select('*').from(User.userTableName).where('id', userSoc.userID).first();
    }

    return undefined;
  }

  static async saveSocialAccout({accountID, socialAccoutEmail, userID, provider}) {
    const {id: providerID} = await db.select('id').from(User.providerTable).where('providerName', provider).first();
    return db(User.socialTableName).insert({accountID: accountID, socialAccoutEmail: socialAccoutEmail, userID: userID, providerID: providerID}).returning('*');
  }

  static async getSocialAccountByID({id, provider}){
    const {id: providerID} = await db.select('id').from(User.providerTable).where('providerName', provider).first();
    return db.select('*').from(User.socialTableName).where('accountID', id).andWhere('providerID', providerID).first();
  }

  static async getSocialAccountByUserID({id, provider}){
    const {id: providerID} = await db.select('id').from(User.providerTable).where('providerName', provider).first();
    return db.select('*').from(User.socialTableName).where('userID', id).andWhere('providerID', providerID).first();
  }

  static async deleteSocialAccountByUserID({id, provider}){
    const {id: providerID} = await db.select('id').from(User.providerTable).where('providerName', provider).first();
    return db(User.userTableName).where('userID', id).endWhere('providerID', providerID).del(['id', 'userID', provider]);
  }
}

module.exports = User;
