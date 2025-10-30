const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret'

// POST /api/auth/register
router.post('/register',
  body('name').isLength({ min: 2 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { name, email, password } = req.body
    try {
      const existing = await User.findOne({ email })
      if (existing) return res.status(400).json({ message: 'Email already used' })
      const user = new User({ name, email })
      await user.setPassword(password)
      await user.save()
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
      return res.json({ user: user.toJSON(), token })
    } catch (err) {
      console.error(err); res.status(500).json({ message: 'Server error' })
    }
  }
)

// POST /api/auth/login
router.post('/login',
  body('email').isEmail(),
  body('password').exists(),
  async (req, res) => {
    const errors = validationResult(req); if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
    const { email, password } = req.body
    try {
      const user = await User.findOne({ email })
      if (!user) return res.status(400).json({ message: 'Invalid credentials' })
      const valid = await user.validatePassword(password)
      if (!valid) return res.status(400).json({ message: 'Invalid credentials' })
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
      return res.json({ user: user.toJSON(), token })
    } catch (err) {
      console.error(err); res.status(500).json({ message: 'Server error' })
    }
  }
)

module.exports = router
