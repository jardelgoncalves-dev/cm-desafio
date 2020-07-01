import express from 'express';
import cors from 'cors';

import routes from './routes';

const app = express();

require('./database');
// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use(routes);

export default app;
