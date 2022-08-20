import uploader from '@src/utils/uploader';
import { Router } from 'express';

const upload = (app: Router) => {
  const router = Router();
  app.use('/upload', router);

  router.post('/image', uploader.single('image'), (req, res) => {});

  return router;
};

export default upload;
