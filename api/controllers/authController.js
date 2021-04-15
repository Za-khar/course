const config = require('../Config')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {
  tokenService,
  userService,
  authService,
  nodemailerService,
  socialService,
} = require('../services')
const { ContextHandlerImpl } = require('express-validator/src/chain')

class AuthController {
  async socialRegistration(req, res) {
    try {
      const userData = await socialService.createUserBySocialAccount(req.body)
      const authTokens = await tokenService.generateAuthTokens(userData)

      const { password, ...user } = userData

      return res.send({
        user,
        authTokens,
      })
    } catch (e) {
      console.log(e)
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Social registration error!' })
    }
  }

  async socialLogin(req, res) {
    try {
      const userData = await authService.loginWithSocialAccount(req.body.id)
      const authTokens = await tokenService.generateAuthTokens(userData)
      const { password, ...user } = userData
      return res.send({
        user,
        authTokens,
      })
    } catch (e) {
      console.log(e)
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }

      return res.status(500).send({ message: 'Login error!' })
    }
  }

  async logout(req, res) {
    try {
      await authService.logoutUser(req.body.refreshToken)
      res.send()
    } catch (e) {
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      res.status(500).send({ message: 'Logout error' })
    }
  }

  async refreshLogin(req, res) {
    try {
      const result = await authService.refreshAuth(req.body)
      res.send(result)
    } catch (e) {
      console.log(e)
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }
      return res.status(500).send({ message: 'Refresh auth error' })
    }
  }

  async simpleLogin(req, res) {
    try {
      const userData = await authService.loginWithEmailAndPassword(req.body)
      const authTokens = await tokenService.generateAuthTokens(userData)
      const { password, ...user } = userData
      return res.send({
        user,
        authTokens,
      })
    } catch (e) {
      console.log(e)
      if (e.statusCode) {
        return res.status(e.statusCode).send({ message: e.message })
      }

      return res.status(500).send({ message: 'Login error!' })
    }
  }

  async simpleRegistaration(req, res) {
    try {
      const userData = await userService.createUser(req.body)
      const authTokens = await tokenService.generateAuthTokens(userData)

      await nodemailerService.sendActivationMessage(userData)

      const { password, ...user } = userData

      return res.send({
        user,
        authTokens,
        message: 'You are registered! Verify your email!',
      })
    } catch (e) {
      console.log(e)
      res.status(500).send({ message: 'Registration error!' })
    }
  }

  async userActivation(req, res) {
    try {
      const { sub } = jwt.verify(req.params.token, config.get('MAIL_SECRET'))

      const { active } = await User.checkActive(sub)

      if (active) {
        return res.status(400).send({ message: 'User is activated' })
      }

      await User.activate(sub)

      return res.redirect(
        `http://${config.get('FRONT_HOST')}:${config.get('FRONT_PORT')}/login`
      )
    } catch (e) {
      console.log(e)
      res.status(500).send('Activation error!')
    }
  }
}

module.exports = new AuthController()
