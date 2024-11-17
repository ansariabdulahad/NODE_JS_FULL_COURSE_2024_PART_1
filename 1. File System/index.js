const fs = require("fs");
const path = require("path");

// Synchronous way of creating and rwiting files

// create a new directory in the current working directory
const newDirectory = path.join(__dirname, "new-directory");

if (!fs.existsSync(newDirectory)) {
    fs.mkdirSync(newDirectory);
    console.log("New directory created");
}

// make a file in the new directory 
const newFile = path.join(newDirectory, "new-file.txt");
console.log("new file created", newFile);

// if it is exist then write some txt or create and write txt
fs.writeFileSync(newFile, "Hello world from nodejs");
console.log("Text file created");

// to read file contents
const fileContent = fs.readFileSync(newFile, "utf8");
console.log("FILE CONTENT: ", fileContent);

// add new text content in the existing directory file
fs.appendFileSync(newFile, "\nThis is a new line added in this file");
console.log("new line added in this file");



// asynchronous way of writing file and creating 
const asyncFolder = path.join(__dirname, "AsyncFolder");

fs.mkdir(asyncFolder, { recursive: true }, (err) => {
    if (err) throw err;
    console.log("Folder created");
})

// create async file
const asyncFile = path.join(asyncFolder, "asyncFile.txt");
fs.writeFile(asyncFile, "This is a async file", (err) => {
    if (err) throw err;
    console.log("AsyncFile created");
});



// aappend new asunc line
fs.appendFile(asyncFile, "\nThis is a new asunc line", (err) => {
    if (err) throw err;
    console.log("AsyncFile append: ");
})


// read file content
fs.readFile(asyncFile, "utf8", (err, data) => {
    if (err) throw err;
    console.log("AsyncFile read: ", data);
})