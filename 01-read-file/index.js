const fs = require('fs');
const path = require('path');

let textPath = path.join(__dirname, 'text.txt');
let readableStream = fs.createReadStream(textPath, 'utf8');
readableStream.on('data', chunk => console.log(chunk));