const fs = require('fs');
const path = require('path');

const pathStyles = path.join(__dirname, 'styles');
const pathDist = path.join(__dirname, 'project-dist');
fs.promises.readdir(pathDist).then(data => {
  data.forEach(bundle => {
    if (bundle === 'bundle.css') {
      fs.promises.writeFile(path.join(pathDist,bundle), '');           
    }
  });
});
fs.promises.readdir(pathStyles).then(styles => {
  styles.forEach(style => {
    if (path.extname(style) == '.css') {
      const readableStream = fs.createReadStream(path.join(pathStyles, style), 'utf8');
      readableStream.on('data', data => {
        fs.promises.appendFile(path.join(pathDist, 'bundle.css'), data);
      });
    }               
  });   
});