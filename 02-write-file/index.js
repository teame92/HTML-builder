const fs = require('fs');
const proc = require('process');
const readline = require('readline');
const writeableStream = fs.createWriteStream('02-write-file/hello.txt');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
console.log('Hello, write some text...: ');

proc.on('exit', () => {
  console.log('Good bye!');
});

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
  } else {
    writeableStream.write(`${input}\n`);
  }
});