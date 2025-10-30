
const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categoriesController');
const { createCategorySchema } = require('../validators/categoriesValidator');
const Joi = require('joi');

// validation middleware
function validate(schema) {
  return (req, res, next) => {
    const result = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (result.error) {
      result.error.isJoi = true;
      return next(result.error);
    }
    req.body = result.value;
    next();
  };
}

router.get('/', categoriesController.getAllCategories);
router.post('/', validate(createCategorySchema), categoriesController.createCategory);

module.exports = router;
