const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

const s3Client = new S3Client({
  region: 'ap-south-1',
  credentials: {
    accessKeyId: 'AKIA2UC26WSN2LSMRV6R',
    secretAccessKey: '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',
  },
});

const upload = multer({
  storage: multerS3({
    s3: s3Client,
    bucket: 'application-mergx',
    //acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
  }),
});

module.exports = upload;
