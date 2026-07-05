import cloudinary from "../config/cloudinary";
import type { UploadApiResponse } from "cloudinary";
export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<UploadApiResponse> => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream({ folder, resource_type: "image" }, (error, result) => {
    if (error || !result) return reject(error || new Error("Cloudinary upload failed"));
    resolve(result);
  });
  stream.end(buffer);
});
export const deleteFromCloudinary = async (publicId: string) => {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId);
};
