import NftService from '@src/services/nft';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Container from 'typedi';

const nfts = (app: Router) => {
  const router = Router();
  app.use('/nfts', router);

  /**
   * @openapi
   * /nfts:
   *   get:
   *     description: NFT 리스트를 가져옵니다 (pagination)
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   */
  router.get(
    '/',
    expressAsyncHandler(async (req, res) => {
      const nftService = Container.get(NftService);
      const nfts = await nftService.getPublicNfts('eth');
      res.json({ data: nfts });
    }),
  );

  /**
   * @openapi
   * /nfts/rank:
   *   get:
   *     description: 랭킹 순으로 NFT 보여줌
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 data:
   *                   type: array
   */
  router.get(
    '/rank',
    expressAsyncHandler(async (req, res) => {
      res.json({ data: [] });
    }),
  );

  return router;
};

export default nfts;