
const Joi = require('joi');

const createPostSchema = Joi.object({
  title: Joi.string().max(200).required(),
  body: Joi.string().required(), // changed from body → content
  category: Joi.string().required(), // accept simple string instead of ObjectId
  image: Joi.string().allow('', null), // optional for uploaded images
  author: Joi.string().allow('', null),
  tags: Joi.array().items(Joi.string()).optional(),
});

const updatePostSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  body: Joi.string().optional(),
  category: Joi.string().optional(),
  image: Joi.string().allow('', null),
  author: Joi.string().allow('', null),
  tags: Joi.array().items(Joi.string()).optional(),
}).min(1);

module.exports = { createPostSchema, updatePostSchema };
