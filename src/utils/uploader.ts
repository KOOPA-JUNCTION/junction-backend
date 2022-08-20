import { S3Client } from '@aws-sdk/client-s3';
import config from '@src/config';
import multer from 'multer';
import multerS3 from 'multer-s3';

const s3 = new S3Client({});

const uploader = multer({
  storage: multerS3({
    s3,
    bucket: config.aws.s3bucket,
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

export default uploader;
