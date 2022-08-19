import 'reflect-metadata';
import express from 'express';
import config from './config';
import logger from './loaders/logger';
import loaders from './loaders';

const startServer = () => {
  const app = express();
  loaders({ expressApp: app });
  app.listen(config.port, () => {
    logger.info(`
################################################
      🛡️  Server listening on port: ${config.port} 🛡️
################################################
    `);
  });
};

startServer();
