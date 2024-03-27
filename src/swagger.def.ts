import { swAdminRouter } from './routes/adminRoute';
import { swAuthRouter } from './routes/authRoute';
import { swConfigRouter } from './routes/configRoute';
import { swRestaurantRouter } from './routes/restaurantRoute';

const swaggerDoc = {
  openapi: '3.0.0',
  info: {
    title: `${process.env.ENV_NAME} campuSnacks API Documentation`,
    version: `1.0.0`,
    description: 'Documentation with Joi type validation for the API',
  },
  paths: {
    ...swAuthRouter,
    ...swConfigRouter,
    ...swAdminRouter,
    ...swRestaurantRouter,
  },
  components: {
    securitySchemes: {
      // To use it, add 'security: [{ bearerAuth: [] }]' to paths
      bearerAuth: {
        scheme: 'bearer',
        type: 'http',
        bearerFormat: 'JWT',
      },
    },
  },
};

export { swaggerDoc };
