import Nft from '@src/models/nft';
import User from '@src/models/user';
import express from 'express';
import dependencyInjector from './dependencyInjector';
import expressLoader from './express';
import logger from './logger';
import mongooseLoader from './mongoose';

const loaders = async ({ expressApp }: { expressApp: express.Application }) => {
  expressLoader({ app: expressApp });
  mongooseLoader().then(() => {
    logger.info('MongoDB connected');
    dependencyInjector({
      models: [Nft, User],
    });
  });
};

export default loaders;
