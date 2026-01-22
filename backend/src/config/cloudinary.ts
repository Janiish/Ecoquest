import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  secure: true,
  // CLOUDINARY_URL env var is auto-parsed by SDK
});

export default cloudinary;
