import config from '@src/config';
import multer from 'multer';
import FirebaseStorage from 'multer-firebase-storage';

const uploader = multer({
  storage: FirebaseStorage({
    bucketName: config.firebase.storageBucketName,
    credentials: config.firebase.credentials,
  }),
});

export default uploader;
