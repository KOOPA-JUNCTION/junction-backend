import AuthService from '@src/services/auth';
import { celebrate, Joi } from 'celebrate';
import { Router } from 'express';
import Container from 'typedi';

const auth = (app: Router) => {
  const router = Router();
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

  router.post<never, { accessToken: string }, { address: string }>(
    '/wallet',
    celebrate({
      body: Joi.object({
        address: Joi.string().hex().required(),
      }),
    }),
    (req, res) => {
      const authService = Container.get(AuthService);
      const token = authService.authByAddress(req.body.address);
      res.json({ accessToken: token });
    },
  );

  return router;
};

export default auth;
