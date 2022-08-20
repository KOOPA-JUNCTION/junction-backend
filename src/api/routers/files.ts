import path from 'path';
import express, { Router } from 'express';

const files = (app: Router) => {
  const router = Router();
  app.use('/files', router);

  router.use(express.static(path.join(__dirname, '../../../files')));

  return router;
};

export default files;
