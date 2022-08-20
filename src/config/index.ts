import dotenv from 'dotenv';

dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const config = {
  port: Number.parseInt(process.env.PORT || '', 10) || 3000,
  dbURI: process.env.MONGO_DB || '',
  api: {
    prefix: process.env.API_PREFIX || '',
  },
  aws: {
    s3bucket: 'junction-back-pack',
  },
  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};

if (!config.dbURI) throw new Error('MONGO_DB is not provided');
if (!config.jwtSecretKey) throw new Error('JWT_SECRET_KEY is not provided');

export default config;
