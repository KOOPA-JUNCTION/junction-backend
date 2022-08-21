import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  port: Number.parseInt(process.env.PORT || '', 10) || 3000,
  dbURI: process.env.MONGO_DB || '',
  api: {
    prefix: process.env.API_PREFIX || '',
  },
  firebase: {
    storageBucketName: process.env.FIREBASE_STORAGE_BUCKET_NAME || '',
    credentials: {
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || '',
      privateKey:
        process.env.FIREBASE_PRIVATE_KEY?.split('\\n').join('\n') || '',
      projectId: process.env.FIREBASE_PROJECT_ID || '',
    },
  },
  pinata: {
    apiKey: process.env.PINATA_API_KEY || '',
    secretKey: process.env.PINATA_SECRET_KEY || '',
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};

if (!config.dbURI) throw new Error('MONGO_DB is not provided');
if (!config.jwtSecretKey) throw new Error('JWT_SECRET_KEY is not provided');
if (!config.firebase.storageBucketName)
  throw new Error('FIREBASE_STORAGE_BUCKET_NAME is not provided');
if (!config.firebase.credentials.clientEmail)
  throw new Error('FIREBASE_CLIENT_EMAIL is not provided');
if (!config.firebase.credentials.privateKey)
  throw new Error('FIREBASE_PRIVATE_KEY is not provided');
if (!config.firebase.credentials.projectId)
  throw new Error('FIREBASE_PROJECT_ID is not provided');
if (!config.pinata.apiKey) throw new Error('PINATA_API_KEY is not provided');
if (!config.pinata.secretKey)
  throw new Error('PINATA_SECRET_KEY is not provided');

export default config;
