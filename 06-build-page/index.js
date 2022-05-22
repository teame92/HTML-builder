const fs = require('fs');
const path = require('path');

const pathAssets = path.join(__dirname, 'assets');
const pathComponents = path.join(__dirname, 'components');
const pathStyles = path.join(__dirname, 'styles');
const pathTemplate = path.join(__dirname,'template.html');
const pathDest = path.join(__dirname, 'project-dist');

function duplicate(srcFolder, destFolder) {
  fs.promises.readdir(srcFolder, { withFileTypes: true }).then(files => {
    files.forEach(file => {
      let newSrcFolder = path.join(srcFolder, file.name);
      let newDestFolder = path.join(destFolder, file.name);
      if (file.isDirectory()) {
        fs.promises.mkdir(newDestFolder, { recursive: true });
        duplicate(newSrcFolder, newDestFolder);
      } else if (file.isFile()) {
        fs.promises.copyFile(newSrcFolder, newDestFolder);
      }
    });
  });
}

fs.promises.mkdir(pathDest, { recursive: true });
fs.stat(path.join(pathDest, 'assets'), (err) => {
  if (err) {
    fs.promises.mkdir(path.join(pathDest, 'assets'), { recursive: true });
    duplicate(pathAssets,path.join(pathDest, 'assets'));    
  } else {
    fs.promises.rm(path.join(pathDest, 'assets'), { recursive: true }).then(() => {
      fs.promises.mkdir(path.join(pathDest, 'assets'), { recursive: true });
      duplicate(pathAssets,path.join(pathDest, 'assets'));
    });
  }
}); 

fs.promises.readFile(pathTemplate, 'utf-8').then(result => {
  let tags = result.match(/{{([a-z]*)}}/gi);
  tags.forEach(item => {
    let tag = item.replace(/([^a-z]*)/gi, '');
    fs.promises.readFile(path.join(pathComponents, `${tag}.html`),'utf-8').then(comp => {
      result = result.replace(item, comp);
      fs.promises.writeFile(path.join(pathDest, 'index.html'), result);
    });
  });
});

fs.promises.readdir(pathDest).then(data => {
  data.forEach(bundle => {
    if (bundle == 'style.css') {
      fs.promises.writeFile(path.join(pathDest,bundle), '');           
    }
  });
});

fs.promises.readdir(pathStyles).then(styles => {
  styles.forEach(style => {
    if (path.extname(style) === '.css') {
      const readableStream = fs.createReadStream(path.join(pathStyles, style), 'utf8');
      readableStream.on('data', data => {
        fs.promises.appendFile(path.join(pathDest, 'style.css'), data);
      });           
    }       
  });
});