// create buffer -> write buffer -> concat buffer -> string, array buffers
// used in fs system, image processing, streaming, cryptography, etc...

const bufferOne = Buffer.alloc(10); // allocated 10 byte buffer
console.log("1. 10 bit allocation buffer", bufferOne);


const bufferFromString = Buffer.from("String");
console.log("2, Buffer from string", bufferFromString);

const bufferFromArrayOfIntegers = Buffer.from([1, 2, 3, 4, 5, 0]);
console.log("3. Buffer from array of integers", bufferFromArrayOfIntegers);

bufferOne.write("Ahad");
console.log("After writing to Buffer One: -> ", bufferOne.toString());

console.log("Buffer 1st index element: -> ", bufferFromArrayOfIntegers[0]);

console.log("Slice buffer : ->", bufferFromArrayOfIntegers.slice(0, 3));

const concatBuffers = Buffer.concat([bufferOne, bufferFromArrayOfIntegers]);
console.log("concat two buffers: ->", concatBuffers);

console.log("convert to json: -> ", concatBuffers.toJSON());
