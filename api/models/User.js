const db = require('../services/db');

class User {
  static tableName = 'users';

  static async findByLogin(email) {
    return db.select('*').from(User.tableName).where('email', email).first();
  }

  static async saveUser({email, hashPassword}) {
      return db(User.tableName).insert({email: email, password: hashPassword}).returning('*');
  }

  static async checkActive(id){
      return db.select('active').from(User.tableName).where('id', id).first();
  }

  static async findOne(id) {
    return db.select('*').from(User.tableName).where('id', id).first();
  }

  static async activate(id){
    return db(User.tableName).where('id', id).update({active: true}).returning('*');
  }
}

module.exports = User;
