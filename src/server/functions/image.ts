import cloudinary from '@/utils/cloudinary';

export async function uploadToCloudinary(image: string) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'zavy'
  };

  try {
    const result = await cloudinary.uploader.upload(image, options);
    return result.public_id;
  } catch (error) {
    return null;
  }
}
