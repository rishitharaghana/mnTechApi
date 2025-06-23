// upload.js
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif/;
    const isExtValid = allowed.test(path.extname(file.originalname).toLowerCase());
    const isMimeValid = allowed.test(file.mimetype);
    isExtValid && isMimeValid
      ? cb(null, true)
      : cb(new Error('Only image files are allowed'));
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = upload;
