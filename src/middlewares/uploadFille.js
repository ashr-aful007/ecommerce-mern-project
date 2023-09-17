
const multer = require('multer');
const path = require('path')
const { uploadDir, maxFileSize, allowedFileTypes } = require('../secret');

//import requerment
const UPLOAD_DIR = uploadDir;
const MAX_FILE_SIZE = maxFileSize;
const ALLOWED_FILE_TYPES = allowedFileTypes;


const storage = multer.diskStorage({
     destination: function (req, file, cb) {
       cb(null, UPLOAD_DIR)
     },
     filename: function (req, file, cb) {
      const extname = path.extname(file.originalname);
      cb(null, Date.now() + '-' + file.originalname.replace(extname, '') + extname);
     }
   })
   
   const fileFilter = (req, file, cb) =>{
      
   }



   const upload = multer({ storage: storage })
   module.exports = upload;