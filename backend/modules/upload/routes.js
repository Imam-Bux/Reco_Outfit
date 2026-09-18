import express from 'express';
import { protectAdmin } from '../../middleware/auth.middleware.js';
import upload from '../../middleware/upload.middleware.js';
import cloudinary from '../../config/cloudinary.js';

const CLOUDINARY_FOLDER = 'reco-outfit/designs';

const safeMessage = (error, fallback) => {
  return process.env.NODE_ENV === 'production' ? fallback : error.message;
};

const uploadToCloudinary = (buffer, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      resolve(result);
    });
    stream.end(buffer);
  });

const router = express.Router();

router.use(protectAdmin);

router.post('/image', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: 'No image file provided' });
  }
  try {
    const result = await uploadToCloudinary(req.file.buffer, CLOUDINARY_FOLDER);
    res.status(200).json({ success: true, message: 'Image uploaded successfully', url: result.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Image upload failed') });
  }
});

router.post('/images', upload.array('images', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ success: false, message: 'No image files provided' });
  }
  try {
    const results = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer, CLOUDINARY_FOLDER))
    );
    const urls = results.map((result) => result.secure_url);
    res.status(200).json({ success: true, message: 'Images uploaded successfully', urls });
  } catch (error) {
    res.status(500).json({ success: false, message: safeMessage(error, 'Image upload failed') });
  }
});

export default router;