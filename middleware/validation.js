const joi = require('@hapi/joi');

const validation = data => {
    const schema = joi.object({
        name: joi.string().min(3).required(),
        country: joi.string().min(2).required(),
        email: joi.string().min(4).required(),
        password: joi.string().min(4).required(),
    })

    return schema.validate(data)
}

module.exports.validation = validation
