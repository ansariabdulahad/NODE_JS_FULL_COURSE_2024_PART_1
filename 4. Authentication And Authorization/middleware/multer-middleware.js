import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now().toString())
    }
});

// filter files only image files can be uploaded
const checkFileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error("Not an image file, please upload image file only"), false);
    }
}

const upload = multer({
    storage,
    fileFilter: checkFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
});

export default upload;