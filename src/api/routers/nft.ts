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
      const nfts = await nftService.getRandomNfts(5);
      res.json({ data: nfts });
    }),
  );

  /**
   * @openapi
   * /nfts/popular:
   *   get:
   *     description: popular NFT 리스트를 가져옵니다
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
    '/popular',
    expressAsyncHandler(async (req, res) => {
      const nftService = Container.get(NftService);
      const nfts = await nftService.getRandomNfts(2);
      res.json({ data: nfts });
    }),
  );

  router.get(
    '/special',
    expressAsyncHandler(async (req, res) => {
      const nftService = Container.get(NftService);
      const nfts = await nftService.getPublicNfts('eth');
      res.json({ data: nfts });
    }),
  );

  /**
   * @openapi
   * /nfts/pick:
   *   get:
   *     description: 에디터 픽 랜덤하게 보여줌
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
      const nftService = Container.get(NftService);
      const nfts = await nftService.getRandomNfts(2);
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
      const nftService = Container.get(NftService);
      const nfts = await nftService.getRandomNfts(2);
      res.json({ data: nfts });
    }),
  );

  /**
   * @openapi
   * /nfts:
   *   post:
   *     description: create new nft (minting)
   *     responses:
   *       200:
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  router.post(
    '/',
    expressAsyncHandler(async (req, res) => {}),
  );

  return router;
};

export default nfts;
