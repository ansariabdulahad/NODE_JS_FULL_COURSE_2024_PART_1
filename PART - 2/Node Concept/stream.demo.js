// readable -> use to read
// writable -> use to write
// duplex -> used for both read and write
// transform -> use to transform the input stream into a compressed representation using zlib encoding

const fs = require('fs');
const zlib = require('zlib');
const crypto = require('crypto');
const { Transform } = require("stream");

class EncryptStream extends Transform {
    constructor(key, vector) {
        super();
        this.key = key;
        this.vector = vector;
    }

    _transform(chunck, encoding, callback) {
        const cipher = crypto.createCipheriv('aes-256-cbc', this.key, this.vector);
        const encrypted = Buffer.concat([cipher.update(chunck), cipher.final()]); // encrypt the chunk data
        this.push(encrypted);
        callback();
    }
}

const key = crypto.randomBytes(32);
const vector = crypto.randomBytes(16);

const readStream = fs.createReadStream("input.txt");

// compress the stream data using gzib
const gzibStream = zlib.createGzip();

const encryptStream = new EncryptStream(key, vector);

const writeStream = fs.createWriteStream("output.txt.gz.enc");

// create pipe of ==> read -> compress -> encrypt -> write
readStream.pipe(gzibStream).pipe(encryptStream).pipe(writeStream);

console.log("Streaming -> compressing -> writing...");