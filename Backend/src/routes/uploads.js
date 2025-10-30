const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const router = express.Router()
const auth = require('../middleware/authMiddleware')

// ensure uploads dir
const UPLOADS_DIR = path.join(__dirname, '..', 'uploads')
if (!fs.existsSync(UPLOADS_DIR)) fs.mkdirSync(UPLOADS_DIR)

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOADS_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2,8)}${ext}`)
  }
})

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }) // 5MB

// POST /api/uploads/image
router.post('/image', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
  // return accessible path (adjust if serving uploads statically)
  const url = `/uploads/${req.file.filename}`
  return res.json({ url })
})

module.exports = router
