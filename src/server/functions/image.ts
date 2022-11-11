import cloudinary from '@/utils/cloudinary';

export async function uploadToCloudinary(image: string, public_id?: string) {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder: 'zavy',
    public_id: public_id
  };

  try {
    const result = await cloudinary.uploader.upload(image, options);
    let imageMeta = `${result.version}/${result.public_id}`;
    return imageMeta;
  } catch (error) {
    return null;
  }
}

export async function deleteFromCloudinary(public_id: string) {
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return result;
  } catch (error) {
    return null;
  }
}
