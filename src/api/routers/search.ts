import HttpException from '@src/exceptions/HttpException';
import NftService from '@src/services/nft';
import UploadService from '@src/services/upload';
import { celebrate, Joi } from 'celebrate';
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
   *         name: page
   *         schema:
   *           type: int
   *         description: 페이지 번호. 0부터 시작.
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
  router.get<
    never,
    { data: unknown[] },
    never,
    { query: string; page: number }
  >(
    '/',
    celebrate({
      query: Joi.object({
        query: Joi.string().required(),
        page: Joi.number().integer().min(0).default(0),
      }),
    }),
    expressAsyncHandler(async (req, res) => {
      const nftService = Container.get(NftService);
      const nfts = await nftService.searchNfts(req.query.query, req.query.page);
      res.json({ data: nfts });
    }),
  );

  return router;
};

export default search;
