import { model, Schema } from 'mongoose';

const BookSchema = new Schema({
    title: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author'
    }
});

export default model('Book', BookSchema);