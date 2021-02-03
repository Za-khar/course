const db = require('../services/db');

class User {
  static tableName = 'users';

  static async findByLogin(login) {
    return db.select('*').from(User.tableName).where('email', login).first();
  }

  static async saveUser(user) {
      return db(User.tableName).insert({email: user.login, password: user.hashPassword}).returning('*');
  }

  static async checkActive(){
      return db.select('active').from(User.tableName);
  }

  static async findOne(id) {
    return db.select('*').from(User.tableName).where('id', id).first();
  }

  static async activate(id){
    return db(User.tableName).where('id', id).update({active: true}).returning('*');
}
}

module.exports = User;
