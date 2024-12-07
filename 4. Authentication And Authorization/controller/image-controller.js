import fs from 'fs';
import { uploadToCloudinary } from "../helpers/cloudinary.js";
import Images from "../model/Images.js";

export const uploadImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({
            success: false,
            message: "Image file not found",
        });

        // upload to cloudinary
        const { url, publicId } = await uploadToCloudinary(req.file.path);

        // save to db
        const newImage = new Images({
            url,
            publicId,
            uploadedBy: req.userInfo.userId
        });

        await newImage.save();

        // remove image file from local storage
        fs.unlinkSync(req.file.path);

        return res.status(201).json({
            success: true,
            message: "Image saved successfully",
            data: newImage
        });

    } catch (error) {
        console.error(error);
        if (!res.headersSent) { // Ensure response isn't already sent
            res.status(500).json({
                success: false,
                message: "Error uploading image",
                error
            });
        }
    }
}

export const getAllImages = async (req, res) => {
    try {
        const images = await Images.find({});

        if (images.length === 0) return res.status(404).json({
            success: false,
            message: "Images not found",
        });

        res.status(200).json({
            success: true,
            message: "Images list",
            data: images
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error getting images",
            error
        });
    }
}