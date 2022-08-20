import { Router } from 'express';
import auth from './routers/auth';
import docs from './routers/docs';
import upload from './routers/upload';

const api = () => {
  const router = Router();

  auth(router);
  docs(router);
  upload(router);

  return router;
};

export default api;
