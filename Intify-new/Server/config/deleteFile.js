const fs = require("fs");
const rimraf = require("rimraf");
const path = require("path");
module.exports = function deleteFile(uploadDir) {
    uploadDir = "public/" + uploadDir.slice(25);
    try {
        fs.unlinkSync(uploadDir);
    } catch (err) {
        console.error(err);
    }
};
