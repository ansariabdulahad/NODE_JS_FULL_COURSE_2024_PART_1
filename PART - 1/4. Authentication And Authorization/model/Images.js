import mongoose, { model, Schema, Types } from 'mongoose';

const ImagesSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    publicId: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

export default model('Images', ImagesSchema);