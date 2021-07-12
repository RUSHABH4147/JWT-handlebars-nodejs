const Joi = require("@hapi/joi");

const registervalidation = (data) => {
  const user = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return user.validate(data);
};

const loginvalidation = (data) => {
  const user = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  return user.validate(data);
};

module.exports.registervalidation = registervalidation;
module.exports.loginvalidation = loginvalidation;
