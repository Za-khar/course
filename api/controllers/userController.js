const { userService } = require('../services')

class UserController {
  async getOneUser(req, res) {
    try {
      const user = await userService.getOneUser(req.user.user_id, req.params.id)
      res.send(user)
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Get user error!' })
    }
  }

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
      const { password, ...user } = userData
      res.send(user)
    } catch (e) {
      res.status(500).send({ message: 'Update error!' })
    }
  }
}

module.exports = new UserController()
