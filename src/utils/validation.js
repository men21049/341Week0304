const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  dob: Joi.date().optional(),
  isActive: Joi.boolean().optional(),
  city: Joi.string().optional(),
  state: Joi.string().optional(),
  zip: Joi.string().pattern(new RegExp("^[0-9]{5}(?:-[0-9]{4})?$")).optional(),
  address: Joi.string().optional(),
});

const schemaAuth = Joi.object({
  access_token: Joi.string().required(),
});

module.exports = {
  schema,
  schemaAuth,
};
