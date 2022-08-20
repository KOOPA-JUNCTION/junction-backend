import AuthService from '@src/services/auth';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Container from 'typedi';

const auth = (app: Router) => {
  const router = Router();

  /**
   * @openapi
   * components:
   *   schemas:
   *     AddressAuthRequest:
   *       type: object
   *       properties:
   *         address:
   *           type: string
   *           example: 0x00000000000000000000, cosmos100000000000000000, osms100000000000000000
   *         type:
   *           type: string
   *           example: hex, bech32, base58
   *     AuthResponse:
   *       type: object
   *       properties:
   *         accessToken:
   *           type: string
   */
  app.use('/auth', router);

  router.post('/oauth2/google', (req, res) => {});

  router.post<never, { accessToken: string }, { email: string }>(
    '/email',
    celebrate({
      body: Joi.object({
        email: Joi.string().email().required(),
      }),
    }),
    (req, res) => {
      const authService = Container.get(AuthService);
      const token = authService.authByEmail(req.body.email);
      res.json({ accessToken: token });
    },
  );

  /**
   * @openapi
   * /auth/wallet:
   *   post:
   *     description: 지갑 주소를 이용한 가입 or 로그인
   *     tags:
   *       - auth
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/AddressAuthRequest'
   *     responses:
   *       200:
   *         description: 정상적으로 가입 또는 로그인이 되었을 때
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/AuthResponse'
   */
  router.post<never, { accessToken: string }, { address: string }>(
    '/wallet',
    celebrate({
      body: Joi.object({
        address: Joi.string().hex().required(),
      }),
    }),
    expressAsyncHandler(async (req, res) => {
      const authService = Container.get(AuthService);
      const token = await authService.authByAddress(req.body.address);
      res.json({ accessToken: token });
    }),
  );

  return router;
};

export default auth;
