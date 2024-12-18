
const {CloudinaryStorage} = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', 
    allowed_formats: ['jpg', 'png', 'jpeg'], 
  },
});

const upload = multer({ storage: storage });
module.exports = {
  upload,
  storage
}