
const Joi = require('joi');

const createCategorySchema = Joi.object({
  name: Joi.string().max(100).required(),
  description: Joi.string().max(500).allow('', null)
});

module.exports = {
  createCategorySchema
};
