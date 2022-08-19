import express, { NextFunction, Request, Response } from 'express';
import morgan from '@src/api/middleware/morgan';
import config from '@src/config';
import { errors } from 'celebrate';
import cors from 'cors';
import logger from './logger';
import HttpException from '@src/exceptions/HttpException';
import api from '@src/api';

const expressLoader = ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });
  app.use(morgan);
  app.use(cors());
  app.use(express.json());
  app.use(config.api.prefix, api());
  app.use(errors());
  app.use(
    (err: HttpException, req: Request, res: Response, next: NextFunction) => {
      err.status ??= 500;
      const requestCode = Math.random().toString(36).slice(2);
      res.status(err.status).json({
        message: err.status === 500 ? 'unknown server error' : err.message,
        requestCode,
      });
      if (err.status === 500) {
        logger.error(err.stack);
      }
    },
  );
};

export default expressLoader;
