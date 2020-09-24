const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const year = new Date().getUTCFullYear();

const s3 = multerS3({
    s3: new aws.S3(),
    bucket: String(process.env.AWS_S3_BUCKET),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        const originalName = file.originalname;
        const fileName = Math.floor( Math.random() * year) + ' ' + originalName;
        cb(null,fileName);
    }
});

const options = {
    limits: {
        fileSize: 100 * 1024 * 1024
    },
    storage: s3,
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //XLSX
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //DOCX
            'text/plain'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }

        else {
            cb(new Error('O arquivo está em um formato inválido!').message)
        }
    }
}

module.exports = options;