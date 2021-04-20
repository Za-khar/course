const { socialService } = require('../services')

class SocialController {
  async linkAccount(req, res) {
    try {
      await socialService.linkSocialAccount({
        user_id: req.user.user_id,
        ...req.body,
      })

      return res.send({ message: `Account linked successful` })
    } catch {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Social error!' })
    }
  }
}

module.exports = new SocialController()
