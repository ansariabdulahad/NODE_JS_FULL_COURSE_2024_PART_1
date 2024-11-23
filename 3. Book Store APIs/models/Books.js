import { model, Schema } from 'mongoose';

const BookSchema = new Schema({
    title: {
        type: String,
        require: [true, 'Title is required!'],
        max: [100, 'Max 100 characters you can enter for title!'],
        trim: true
    },
    author: {
        type: String,
        require: [true, 'Author name is required!'],
        trim: true,
        max: [50, 'Max 50 characters you can enter for author!'],
    },
    year: {
        type: Number,
        min: [1000, 'Minimum year you can start with is 1000!'],
        max: [new Date().getFullYear(), 'Till current year you can enter, no feature date is allowed!']
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
}, {timestamps: true});

export default model('Book', BookSchema);