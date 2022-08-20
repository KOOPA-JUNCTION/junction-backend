import HttpException from '@src/exceptions/HttpException';
import UploadService from '@src/services/upload';
import uploader from '@src/utils/uploader';
import { Router } from 'express';
import Container from 'typedi';
import { authRequired } from '../middleware/auth';

const upload = (app: Router) => {
  const router = Router();
  /**
   * @openapi
   * components:
   *   schemas:
   *     FileResponse:
   *       type: object
   *       properties:
   *         originalFileName:
   *           type: string
   *           example: "test.png"
   *         fileName:
   *           type: string
   *           example: "fb669e0382f75aae5407a8c817c87ff4.png"
   *         url:
   *           type: string
   *           example: "https://gooooooooooog.le/some/path/wow/fb669e0382f75aae5407a8c817c87ff4.png"
   */
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
   *     responses:
   *       200:
   *         description: 업로드 성공
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/FileResponse'
   */
  router.post('/image', authRequired, uploader.single('image'), (req, res) => {
    const uploadService = Container.get(UploadService);
    if (!req.file) {
      throw new HttpException(400, '사진을 업로드해주세요.');
    }
    uploadService.uploadImage(req.file);
  });

  return router;
};

export default upload;
