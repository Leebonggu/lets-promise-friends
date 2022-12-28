
const fs = require("fs");

async function readDir(source){
  return new Promise((res, rej) => {
    fs.readDir(source, (err, files) => {
      if (err) {
        rej(err);
        return;
      }
      res(files);
    })
  })
}

async function mkdir(dir){
  return new Promise((res, rej) => {
    fs.mkdir(dir, (err) => {
      if (err) {
        rej(err);
        return;
      }
      res();
    })
  })
}

module.exports =  { readDir, mkdir }