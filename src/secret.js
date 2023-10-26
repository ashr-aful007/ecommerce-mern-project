require('dotenv').config()


const port = process.env.SERVER_PORT || 5000;
const mongodbUrl = process.env.MONGODB_ATLAS_URL;


const defaultImagePath = process.env.DEFULT_USER_IMAGE_PATH || '../public/images/users/defultImg.png';

const JwtActivationKey = process.env.JWT_ACTIVATION_KEY || '&^$%%$ERDFD&65468744@@!!&*$%GFFF';

const jwtAccessKey = process.env.JWT_ACCESS_KEY || '&^$%%$ERDFD&65468744@@!!&*$%GFFF';

const smtpUserName = process.env.SMTP_USERNAME || '';

const smtpPassword = process.env.SMTP_PASSWORD || '';

const clientUrl = process.env.CLIENT_URL

// const uploadDir = process.env.UPLOAD_FILE || 'public/images/users';

const maxFileSize = process.env.MAX_FILE_SIZE || 2097152;

const allowedFileTypes = process.env.ALLOWED_FILE_TYPES || ['image/jpg', 'image/jpeg', 'image/png'];

module.exports = { port,
      mongodbUrl,
       defaultImagePath,
       JwtActivationKey,
       smtpUserName,
       smtpPassword,
       clientUrl,
      //  uploadDir,
       maxFileSize,
       allowedFileTypes,
       jwtAccessKey
       }