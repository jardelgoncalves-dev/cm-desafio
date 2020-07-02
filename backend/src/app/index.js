import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';

import swaggerConfig from '../config/swagger.json';
import routes from './routes';

const app = express();

require('./database');

// middlewares
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));
app.use(cors());
app.use(express.json());

// routes
app.use(routes);

export default app;
