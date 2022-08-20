import HttpException from '@src/exceptions/HttpException';
import UploadService from '@src/services/upload';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Container from 'typedi';

const search = (app: Router) => {
  const router = Router();
  app.use('/search', router);

  /**
   * @openapi
   * /search:
   *   get:
   *     description: 검색
   *     tags:
   *       - search
   *     parameters:
   *       - in: query
   *         name: query
   *         schema:
   *           type: string
   *         description: 검색어
   *         required: true
   *       - in: query
   *         name: offset
   *         schema:
   *           type: int
   *         description: 오프셋
   *     responses:
   *       200:
   *         description: 검색 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   *                   items:
   *                     type: object
   */
  router.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      res.json({ data: [] });
    }),
  );

  return router;
};

export default search;
