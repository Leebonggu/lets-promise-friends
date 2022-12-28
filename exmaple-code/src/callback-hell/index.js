const fs = require("fs");
const path = require("path");
const gm = require("gm");
const customFS = require('./fs')
const source = path.join(__dirname, "assets");
const dest = path.join(__dirname, "resized");
const widths = [320, 640, 1024];



fs.readdir(source, function (err, files) {
  if (err) {
    return err;
  } 
  fs.mkdir(dest, (err) => {
    if (err) {
      return err;
    } 
    files.forEach(function (filename, fileIndex) {
      if (filename.startsWith('.')) {
        return;
      }
      gm(path.join(source, filename)).size(function (err, values) {
        if (err) {
          console.log("Error identifying file size: " + err);
          return;
        } 
        console.log(filename + " : " + values);
        aspect = values.width / values.height;
        widths.forEach(
          function (width, widthIndex) {
            height = Math.round(width / aspect);
            console.log(
              "resizing " + filename + " to " + height + "x" + height
            );
            this.resize(width, height).write(
              path.join(dest, "w" + width + "_" + filename),
              function (err) {
                if (err) console.log("Error writing file: " + err);
              }
            );
          }.bind(this)
        );
      });
    });
  })
});
