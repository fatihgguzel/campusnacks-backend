import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { SwaggerTheme } from 'swagger-themes';
import requestIp from 'request-ip';
// import basicAuth from 'express-basic-auth';

import sequelize from './database/sequelize';
import './database/models/Relations';

import { response, error } from './helpers';
import { swaggerDoc } from './swagger.def';
import {} from './routes';
// import { requireJwt } from './middlewares/requireAuth';
import { authRoute, configRoute } from './routes';

sequelize
  .authenticate()
  .then(() => console.log('Successfully connected to the DB!'))
  .catch((error) => {
    console.error('Unable to connect to the DB: ', error);
    process.exit(1);
  });

const app = express();

app.use(helmet());
app.use(cors());
app.use(
  bodyParser.json({
    limit: '1mb',
  }),
);
app.use(requestIp.mw());

const swaggerTheme = new SwaggerTheme('v3');
const swaggerOptions = {
  customCss: swaggerTheme.getBuffer('dark'),
  customSiteTitle: `${process.env.ENV_NAME} campuSnacks API Documentation`,
};

app.use(
  '/api-docs',
  // basicAuth({
  //   users: { admin: 'Y2%2=C&D<e7£' },
  //   challenge: true,
  // }),
  swaggerUi.serve,
  swaggerUi.setup(swaggerDoc, swaggerOptions),
);

app.get('/api', (req: Request, res: Response) => {
  try {
    response(res, {
      message: 'General Kenobi. You are a bold one!',
    });
  } catch (err) {
    error(res, err);
  }
});

app.use('/api/auth', authRoute);
app.use('/api/config', configRoute);

app.all('*', (req: Request, res: Response) => {
  response(res, {
    data: null,
    code: 404,
    message: `${req.method} ${req.url} - Your new API? My allegiance is to the campuSnacks, to the API`,
  });
});

const PORT = parseInt(process.env.PORT || '3000');

if (!PORT) {
  console.log('PORT not found in .env');
  process.exit(0);
}

app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}/api`);
  console.log(`Swagger documentation is on the http://localhost:${PORT}/api-docs`);
});
