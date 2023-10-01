
const multer = require('multer');
const path = require('path')
const { uploadDir, maxFileSize, allowedFileTypes } = require('../secret');
const createError = require('http-errors');

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
   
   //custom fun for filter file
   const fileFilter = (req, file, cb) =>{
      const extname = path.extname(file.originalname);
      if(!ALLOWED_FILE_TYPES.includes(extname.substring(1))){
        console.log('check file type');
         return cb(new Error('File type not allowed'), false);
      }
      cb(null, true)
   }



   const upload = multer({ storage: storage, 
                 limits: {fileSize: MAX_FILE_SIZE},
                 fileFilter
   })
   module.exports = upload;