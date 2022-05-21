
const fs = require('fs');
const path = require('path');

const pathDest = path.join(__dirname, 'files-copy');
const pathSrc = path.join(__dirname, 'files');

fs.promises.mkdir(pathDest, { recursive: true });
fs.promises.readdir(pathSrc).then(file => {
  file.forEach(item => {
    fs.promises.copyFile(path.join(pathSrc,item), path.join(pathDest,item));
  });
 
  fs.promises.readdir(pathDest).then(filesDest => {
    filesDest.forEach(itemDest => {
      if (!file.includes(itemDest)) {
        fs.promises.unlink(path.join(pathDest,itemDest));
      }
    });
  }); 
  console.log('Done');
});