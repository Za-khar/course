const db = require('../services/db');

module.exports = function validator(validatorSchema) {
    return async (req, res, next) => {
        const errors = [];

        for ([fieldName, rules] of Object.entries(validatorSchema)) {
            for (rule of rules) {
                const [mainRule, ...params] = rule.split(':');
                switch (mainRule) {
                    case 'required':
                        if (!req.body[fieldName]) {
                            errors.push({
                                [fieldName]: `Field ${fieldName} is required!`
                            });
                        }
                        break;
                    case 'min':
                        const min = parseInt(params[0], 10);
                        if (req.body[fieldName].length < min) {
                            errors.push({
                                [fieldName]: `${fieldName} is too short, min: ${min}`,
                            });
                        }
                        break;
                    case 'max':
                        const max = parseInt(params[0], 10);
                        if (req.body[fieldName].length > max) {
                            errors.push({
                                [fieldName]: `${fieldName} is too long, max: ${max}`,
                            });
                        }
                        break;
                    case 'email':
                        if (!(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(req.body[fieldName]))) {
                            errors.push({
                                [fieldName]: `${fieldName} is not email`,
                            });
                        }
                        break;
                    case 'unique':
                        if (req.body[fieldName]) {
                            const field = await db.select('*').from(params[0]).where(params[1], req.body[fieldName]).first();
                            if (field) {
                                errors.push({
                                    [fieldName]: `Field ${fieldName} is already exist`,
                                });
                            }
                        }
                        break;
                    case 'oneOf':
                        if (req.body[fieldName]) {
                            if (!params.includes(req.body[fieldName])) {
                                errors.push({
                                    [fieldName]: `Field ${fieldName} must be one of the values: ${params.join(', ')}`,
                                });
                            }
                        }
                        break;
                    default:
                }
            }
        }

        if (!errors.length) {
            return next();
        }

        return res.status(422).send(errors);
    }
}