import { Container } from 'typedi';
import { Model } from 'mongoose';
import logger from './logger';

const dependencyInjector = ({ models }: { models: Model<any>[] }) => {
  models.forEach((model) => Container.set(`models.${model.modelName}`, model));
  logger.info('express loaded');
};

export default dependencyInjector;
