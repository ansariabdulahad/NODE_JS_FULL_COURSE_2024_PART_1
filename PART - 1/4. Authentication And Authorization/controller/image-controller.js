import fs from 'fs';
import { uploadToCloudinary } from "../helpers/cloudinary.js";
import Images from "../model/Images.js";
import cloudinary from '../config/cloudinary.js';

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

        // sort and pagination
        const page = parseInt(req.query.page) || 1; // Current page (default is 1)
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;
        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalImages = await Images.countDocuments();
        const totalPages = Math.ceil(totalImages / limit);

        const sortObj = {[sortBy]: sortOrder};

        const images = await Images.find().sort(sortObj).skip(skip).limit(limit);

        if (images.length === 0) return res.status(404).json({
            success: false,
            message: "Images not found",
        });

        res.status(200).json({
            success: true,
            message: "Images list",
            currentPage: page,
            totalImages,
            totalPages,
            skip,
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

// delete images from the cloudinary as well as from the database
export const deleteImage = async (req, res) => {
    try {
        // get the userId
        const { userId } = req.userInfo;
        const imageIdToBeDeleted = req.params.id;

        // check the image is present
        const image = await Images.findById(imageIdToBeDeleted);

        if (!image) return res.status(404).json({
            success: false,
            message: "Image not found",
        });

        // check the user is same authorized to delete the image
        if (image.uploadedBy != userId) return res.status(400).json({
            success: false,
            message: "You are not authorized to delete this image, cuz you havn't uploaded this image",
        });

        // delete the image from cloudinary
        await cloudinary.uploader.destroy(imageIdToBeDeleted);

        // delete from database
        await Images.findByIdAndDelete(imageIdToBeDeleted);

        res.status(200).json({
            success: false,
            message: "Image deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error deleting images",
            error
        });
    }
}