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

  return router;
};

export default auth;
