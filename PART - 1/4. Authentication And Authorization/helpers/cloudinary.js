import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = async (filePath) => {
    try {
        const result = await cloudinary.uploader.upload(filePath);

        return {
            url: result.secure_url,
            publicId: result.public_id
        };
    } catch (error) {
        console.error("Error occurred while uploading to Cloudinary:", error.message);
        // Throwing a generic error message for the caller
        throw new Error("Error occurred while uploading to Cloudinary. Please try again.");
    }
}