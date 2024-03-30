import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import type { Express } from 'express';

import { bindings } from './bindings';
import { initRouter } from './utils/init-router';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || '8080';
const origin = process.env.ORIGIN || 'http://localhost:3000';

if (origin) {
  app.use(cors({ origin, methods: ['GET', 'POST'] }));
}

initRouter(app, origin, port, bindings);

export default app;
