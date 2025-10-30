
const mongoose = require('mongoose');

function errorHandler(err, req, res, next) {
  console.error(err);

  // Mongoose validation error
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({ error: 'Validation Error', details: messages });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Joi validation error: we will set { isJoi: true } in validators if needed
  if (err.isJoi) {
    return res.status(400).json({ error: 'Validation Error', details: err.details.map(d => d.message) });
  }

  // Custom errors may have status
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message });
}

module.exports = errorHandler;
