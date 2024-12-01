import Books from "../models/Books.js";

// Get all books
export const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find({});

        if (books.length === 0) return res.status(404).json({
            success: false,
            message: "Books not found",
        });

        res.status(200).json({
            success: true,
            message: "Book list found",
            data: books
        });
    } catch (error) {
        console.error("GET ALL BOOKS ERROR ==> ", error);
        res.status(500).json({
            success: false,
            message: "Error getting all books",
            error
        });
    }
}

// Get book by their id
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({
            success: false,
            message: "Id is required"
        });

        const book = await Books.findById(id);

        if (book.length === 0) return res.status(404).json({
            success: false,
            message: "Book not found"
        });

        res.status(200).json({
            success: true,
            message: "Book found",
            data: book
        });
    } catch (error) {
        console.error("Error getting book by id", error);
        res.status(500).json({
            success: false,
            message: "Error getting book by id",
            error
        });
    }
}

// Create a new book
export const createBook = async (req, res) => {
    try {
        const bookData = req.body;

        if (!bookData) return res.status(400).json({
            success: false,
            message: "Data is required"
        });

        const newBook = new Books(bookData);
        await newBook.save();

        res.status(201).json({
            success: true,
            message: "Book saved successfully",
            data: bookData
        });
    } catch (error) {
        console.error("Error creating book", error);
        res.status(500).json({
            success: false,
            message: "Error creating book",
            error
        });
    }
}

// Update book by thier id
export const updateBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({
            success: false,
            message: "Id is required"
        });

        const book = await Books.findByIdAndUpdate(id, req.body, { new: true });

        res.status(200).json({
            success: true,
            message: "Book updated successfully",
            data: book
        });
    } catch (error) {
        console.error("Error updating book", error);
        res.status(500).json({
            success: false,
            message: "Error updating book",
            error
        });
    }
}

// delete book by thier id
export const deleteBookById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({
            success: false,
            message: "Id is required"
        });

        const book = await Books.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Book deleted successfully",
            data: book
        });
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).json({
            success: false,
            message: "Error deleting book",
            error
        });
    }
}