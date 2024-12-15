import Author from "../model/Author.js";
import Book from "../model/Book.js";

export const createAuthor = async (req, res) => {
    try {
        const author = new Author(req.body);
        await author.save();

        res.status(201).json({
            success: true,
            message: "Author saved successfully",
            data: author
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating author"
        })
    }
}


export const createBook = async (req, res) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(200).json({
            success: true,
            message: "Book saved successfully",
            data: book
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error creating book"
        })
    }
}

export const getBookByAuthor = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).populate('author');
        res.status(200).json({
            success: true,
            message: "Book by author",
            data: book
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error getting book by author"
        })
    }
}