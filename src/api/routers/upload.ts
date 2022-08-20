import uploader from '@src/utils/uploader';
import { Router } from 'express';

const upload = (app: Router) => {
  const router = Router();
  app.use('/upload', router);

  /**
   * @openapi
   * /upload/image:
   *   post:
   *     description: 사진 업로드
   *     tags:
   *       - Upload
   *     requestBody:
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               image:
   *                 type: string
   *                 format: binary
   */
  router.post('/image', uploader.single('image'), (req, res) => {});

  return router;
};

export default upload;
