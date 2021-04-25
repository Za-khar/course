const db = require('../services/db')

class User {
  static userTableName = 'Users'
  static socialTableName = 'Social_accounts'
  static userSettingsTableName = 'User_settings'
  static avatarTableName = 'Avatars'

  static async findByLogin(email) {
    return db(User.userTableName)
      .select(
        `${User.userTableName}.*`,
        'show_phone_number',
        'show_email',
        'show_educational_institution'
      )
      .leftJoin('User_settings', function () {
        this.on(`${User.userTableName}.user_id`, '=', 'User_settings.user_id')
      })
      .where('email', email)
      .first()
  }

  static async saveUser({
    email,
    hashPassword,
    userRole = 'user',
    firstName = 'No',
    lastName = 'Name',
  }) {
    const date = new Date()

    return db(User.userTableName)
      .insert({
        email: email,
        password: hashPassword,
        role: userRole,
        registration_date: date,
        first_name: firstName,
        last_name: lastName,
      })
      .returning('*')
  }

  static async updateUserData(
    { first_name, last_name, email, phone_number },
    user_id
  ) {
    return db(User.userTableName)
      .update({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone_number: phone_number,
      })
      .where('user_id', user_id)
      .returning('*')
  }

  static async updateUserSettings(
    { show_educational_institution, show_phone_number, show_email },
    user_id
  ) {
    return db('User_settings')
      .update({
        show_email: show_email,
        show_phone_number: show_phone_number,
        show_educational_institution: show_educational_institution,
      })
      .where('user_id', user_id)
      .returning([
        'show_email',
        'show_phone_number',
        'show_educational_institution',
      ])
  }

  static async saveUserSettings(user_id) {
    return db('User_settings')
      .insert({
        show_email: 'all',
        show_phone_number: 'all',
        show_educational_institution: 'all',
        user_id: user_id,
      })
      .returning([
        'show_email',
        'show_phone_number',
        'show_educational_institution',
      ])
  }

  static async checkActive(id) {
    return db
      .select('active')
      .from(User.userTableName)
      .where('user_id', id)
      .first()
  }

  static async getUserById(id) {
    return db(User.userTableName)
      .select(
        `${User.userTableName}.*`,
        'show_phone_number',
        'show_email',
        'show_educational_institution'
      )
      .leftJoin('User_settings', function () {
        this.on(`${User.userTableName}.user_id`, '=', 'User_settings.user_id')
      })
      .where(`${User.userTableName}.user_id`, id)
      .first()
  }

  static async activate(id) {
    return db(User.userTableName)
      .where('user_id', id)
      .update({ active: true })
      .returning('*')
  }

  static async getRoleByID(id) {
    return db
      .select('role')
      .from(User.userTableName)
      .where('user_id', id)
      .first()
  }

  static async getUserBySocialAccountID(socialID) {
    return db
      .select(
        `${User.userTableName}.*`,
        'show_phone_number',
        'show_email',
        'show_educational_institution'
      )
      .from(User.socialTableName)
      .join(User.userTableName, function () {
        this.on(
          `${User.userTableName}.user_id`,
          '=',
          `${User.socialTableName}.user_id`
        )
      })
      .leftJoin('User_settings', function () {
        this.on(`${User.userTableName}.user_id`, '=', 'User_settings.user_id')
      })
      .where('social_account_id', socialID)
      .first()
  }

  static async saveSocialAccout({
    accountID,
    socialAccoutEmail,
    userID,
    provider,
  }) {
    return db(User.socialTableName)
      .insert({
        social_account_id: accountID,
        social_email: socialAccoutEmail,
        user_id: userID,
        provider: provider,
      })
      .returning('*')
  }

  static async getAvatar(user_id) {
    return db(User.avatarTableName)
      .select('path')
      .where('user_id', user_id)
      .first()
  }

  static async getSocialAccountByID({ id, provider }) {
    return db
      .select('*')
      .from(User.socialTableName)
      .where('social_account_id', id)
      .andWhere('provider', provider)
      .first()
  }

  static async getSocialAccountByUserID({ id, provider }) {
    return db
      .select('*')
      .from(User.socialTableName)
      .where('user_id', id)
      .andWhere('provider', provider)
      .first()
  }

  static async getSocialAccountByEmail({ email, provider }) {
    return db
      .select('*')
      .from(User.socialTableName)
      .where('social_email', email)
      .andWhere('provider', provider)
      .first()
  }
}

module.exports = User
