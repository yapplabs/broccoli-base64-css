const fs = require('fs');
const path = require('path');
const Filter = require('broccoli-persistent-filter');

const MEDIATYPE_MAP = {
  ttf: 'x-font-truetype',
  otf: 'x-font-opentype',
  woff: 'font-woff',
  eot: 'vnd.ms-fontobject',
  jpg: 'jpeg',
  svg: 'svg+xml'
};

module.exports = class BroccoliBase64CSS extends Filter {
  constructor(inputNode, options = {}) {
    super(inputNode, {
      annotation: options.annotation,
      extensions: options.extensions || ['css'],
      targetExtension: options.targetExtension || 'css'
    });
  
    options.imagePath = options.imagePath || 'public';
    options.fontPath = options.fontPath || 'public';
  
    this.imagePath = path.join(process.cwd(), options.imagePath);
    this.fontPath = path.join(process.cwd(), options.fontPath);
    this.extensions = options.extensions || ['css'];
    this.maxFileSize = options.maxFileSize || 4096;
    this.fileTypes = options.fileTypes || ['png', 'jpg', 'jpeg', 'gif', 'svg'];
    this.urlsRegex = /url\(["']?(.+?)["']?\)/g;
  }

  processString(content/*, relativePath */) {
    let { imagePath, fontPath, maxFileSize, fileTypes } = this;
  
    return content.replace(this.urlsRegex, function(match, fileName) {
      if (/^data:/.test(fileName)) return match;
      fileName = fileName.replace(/(\?)?(#)(.*)\b/g, '');
      let extension = path.extname(fileName).substr(1);
      let type = MEDIATYPE_MAP[extension] || extension;
      if (!~fileTypes.indexOf(extension)) return match;
  
      let prefix = 'image';
      let filePath;
  
      if (/ttf|otf|woff|eot/.test(extension)) {
        prefix = 'application';
        filePath = path.join(fontPath, fileName);
      } else if (/svg/.test(extension)) {
        filePath = path.join(fontPath, fileName);
        if (!fs.existsSync(filePath)) {
          filePath = path.join(imagePath, fileName);
        }
      } else {
        filePath = path.join(imagePath, fileName);
      }
  
      if (!fs.existsSync(filePath)) return match;
  
      let size = fs.statSync(filePath).size;
      if (size > maxFileSize) return match;
  
      let base64 = fs.readFileSync(filePath).toString('base64');
      return 'url("data:' + prefix + '/' + type + ';base64,' + base64 + '")';
    });
  }
}
