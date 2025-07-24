const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (_, __, cb) {
    cb(null, path.join(__dirname, '..', 'uploads')); // Ensure this folder exists
  },
  filename: function (_, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/jpg') {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed! (png/jpg/jpeg)'), false);
  }
};

const upload = multer({ storage, fileFilter });

// POST /api/upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image uploaded' });
    }
    res.json({ filename: req.file.filename, path: req.file.path });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;