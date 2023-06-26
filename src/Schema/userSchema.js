const joi = require('joi')


const new_user_schema = joi.object({
    Name: joi.string()
        .min(3)
        .required(),
    Address: joi.string()
        .min(5)
        .max(30)
        .required(),
    Email: joi.string()
          .min(5)
          .max(50),
    ContactNumber: joi.string()
        .required()
        .max(8)
        .min(8),
    Password: joi.string()
        .required()
        .pattern(new RegExp(/^[a-zA-Z0-9]{6,30}$/)),
    Roles: joi.string()
        .min(4)
        .max(5),    
    c_password: joi.ref('Password')



}).with('Password', 'c_password ')


module.exports = { new_user_schema }