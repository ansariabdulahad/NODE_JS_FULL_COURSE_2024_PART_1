import { model, Schema } from 'mongoose';

const AuthorSchema = new Schema({
    name: String,
    bio: String
});

export default model('Author', AuthorSchema);