const multer = require('multer');
const util = require('util');

const DIR = './resources/uploads';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

let upload = multer({ storage: storage }).single('file');
util.promisify(upload);

let fileUpload = util.promisify(upload)

module.exports = fileUpload