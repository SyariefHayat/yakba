import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});


export const extractPublicIdFromUrl = (url: string): string | null => {
  try {
    const parts = url.split("/");
    const filenameWithExtension = parts[parts.length - 1];
    const folderPath = parts.slice(parts.indexOf("upload") + 2, parts.length - 1).join("/");
    const filename = filenameWithExtension.split(".")[0];

    // Combine folder path and filename
    if (folderPath) {
      return `${folderPath}/${filename}`;
    }
    return filename;
  } catch (error) {
    console.error("Error extracting public ID:", error);
    return null;
  }
};

export default cloudinary;
