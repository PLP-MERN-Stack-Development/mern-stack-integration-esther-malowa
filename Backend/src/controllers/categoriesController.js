
const Category = require('../models/Category');
const asyncHandler = require('../middleware/asyncHandler');

exports.getAllCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json(categories);
});

exports.createCategory = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  // Prevent creating duplicate category names (unique index handles it but this gives nicer error)
  const existing = await Category.findOne({ name: name.trim() });
  if (existing) {
    const err = new Error('Category with this name already exists');
    err.status = 409;
    throw err;
  }

  const category = new Category({ name: name.trim(), description });
  await category.save();
  res.status(201).json(category);
});
