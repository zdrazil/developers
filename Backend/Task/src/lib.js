const fs = require("fs");
const path = require("path");

function loadFile() {
  return fs.readFileSync(
    path.resolve(__dirname, "./data/api-mock.txt"),
    "utf8"
  );
}

module.exports = {
  loadFile
};
