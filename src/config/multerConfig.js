const aws = require('aws-sdk');
const multerS3 = require('multer-s3');

const s3 = multerS3({
    s3: new aws.S3(),
    bucket: String(process.env.AWS_S3_BUCKET),
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
        const userName = file.fieldname;
        const datetime = new Date().getTime();
        const suffix = file.originalname.split('.')[file.originalname.split('.').length-1];
        const fileName = String(datetime)+userName+'.'+suffix;
        cb(null,fileName);
    }
});

const options = {
    limits: {
        fileSize: 10 * 1024 * 1024
    },
    storage: s3,
    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'application/pdf',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', //XLSX
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', //DOCX
            'audio/mpeg'
        ];

        if(allowedMimes.includes(file.mimetype)){
            cb(null, true)
        }

        else {
            cb(new Error('Invalid file type!'))
        }
    }
}

module.exports = options;