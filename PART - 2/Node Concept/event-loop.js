// script running -> microtask execution -> microtask execution -> check point execution -> 
// I/O task execution -> CPU intensive task execution


//  excample for above
// console.log -> promises, process.nextTick -> settimeouts, setintervels -> setimmediate -> fs -> crypto hashing

const fs = require('fs');
const crypto = require('crypto');

console.log("Script Start");

setTimeout(() => {
    console.log("1. settimeout execution in 0s with callback (macrotask execution)");
}, 0);

setTimeout(() => {
    console.log("2. settimeout execution in 0s with callback (macrotask execution)");
}, 0);

setImmediate(() => {
    console.log("3. setimmediate execution (checkpoint execution)");
})

// setInterval(() => {
//     console.log("4. setinterval execution in 0s with callback (macrotask execution)");
// }, 0);

Promise.resolve().then(() => {
    console.log("5. promise.resolve execution (microtask execution)");
})

process.nextTick(() => {
    console.log("6. process.nexttick execution (microtask execution)");
})

fs.readFile(__filename, (err) => {
    if (err) throw err;
    console.log("7. readFile execution (I/O task execution)");
})

crypto.pbkdf2("secret", "salt", 10000, 64, "sha512", (err, key) => {
    if (err) throw err;
    console.log("8, crypto pbkdf2 secret (CPU Intensive task execution)", key);
})

console.log("Script end");