import { Router } from 'express';
import auth from './routers/auth';
import docs from './routers/docs';
import nfts from './routers/nft';
import search from './routers/search';
import upload from './routers/upload';

const api = () => {
  const router = Router();

  auth(router);
  docs(router);
  nfts(router);
  search(router);
  upload(router);

  return router;
};

export default api;
