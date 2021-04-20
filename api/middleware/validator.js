const db = require('../services/db')

module.exports = function validator(validatorSchema) {
  return async (req, res, next) => {
    const errors = []

    for ([fieldName, rules] of Object.entries(validatorSchema)) {
      for (rule of rules) {
        const [mainRule, ...params] = rule.split(':')
        switch (mainRule) {
          case 'required':
            if (!req.body[fieldName]) {
              errors.push({
                message: `Field ${fieldName} is required!`,
              })
            }
            break
          case 'min':
            if (req.body[fieldName]) {
              const min = parseInt(params[0], 10)
              if (req.body[fieldName].length < min) {
                errors.push({
                  message: `${fieldName} is too short, min: ${min}`,
                })
              }
            }
            break
          case 'max':
            if (req.body[fieldName]) {
              const max = parseInt(params[0], 10)
              if (req.body[fieldName].length > max) {
                errors.push({
                  message: `${fieldName} is too long, max: ${max}`,
                })
              }
            }
            break
          case 'email':
            if (
              !/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(
                req.body[fieldName]
              )
            ) {
              errors.push({
                message: `${fieldName} is not email`,
              })
            }
            break
          case 'unique':
            if (req.body[fieldName]) {
              const field = await db
                .select('*')
                .from(params[0])
                .where(params[1], req.body[fieldName])
                .first()
              if (field) {
                if (
                  !(
                    params.includes('update') &&
                    req.user.user_id === field[params[3]]
                  )
                ) {
                  errors.push({
                    message: `${fieldName} is already exist`,
                  })
                }
              }
            }
            break
          case 'oneOf':
            if (req.body[fieldName]) {
              if (!params.includes(req.body[fieldName])) {
                errors.push({
                  message: `Field ${fieldName} must be one of the values: ${params.join(
                    ', '
                  )}`,
                })
              }
            }
            break
          default:
        }
      }
    }

    if (!errors.length) {
      return next()
    }

    return res.status(422).send(errors[0])
  }
}
