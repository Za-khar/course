const { userService } = require('../services')

class UserController {
  async updateOneUser(req, res) {
    try {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        show_educational_institution,
        show_phone_number,
        show_email,
      } = req.body
      const userData = await userService.updateUser({
        data: {
          first_name,
          last_name,
          email,
          phone_number,
          show_educational_institution,
          show_phone_number,
          show_email,
        },
        user_id: req.user.user_id,
      })
      const { password, user_id, ...user } = userData
      res.send(user)
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Update error!' })
    }
  }
}

module.exports = new UserController()
