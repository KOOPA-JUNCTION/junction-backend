import swaggerUi from 'swagger-ui-express';
import { Router } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';

const docs = (app: Router) => {
  const router = Router();
  app.use('/docs', router);

  router.use('/', swaggerUi.serve);
  router.get('/', (req, res, next) => {
    swaggerUi.setup(
      swaggerJSDoc({
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'back-pack-api',
            version: '1.0.0',
          },
          servers: [
            {
              url: 'http://10.10.0.213:3000',
              description: 'happy hacking~!',
            },
          ],
        },
        apis: ['./src/api/routers/*.ts'],
      }),
    )(req, res, next);
  });

  return router;
};

export default docs;
