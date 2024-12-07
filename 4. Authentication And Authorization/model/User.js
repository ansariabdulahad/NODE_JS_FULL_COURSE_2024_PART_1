import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'email is required'],
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {timestamps: true});

export default model('User', UserSchema);