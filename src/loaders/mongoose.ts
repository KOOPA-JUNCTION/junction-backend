import mongoose from 'mongoose';
import config from '@src/config';

const mongooseLoader = async () => {
  const {
    connection: { db },
  } = await mongoose.connect(config.dbURI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
  return db;
};

export default mongooseLoader;
