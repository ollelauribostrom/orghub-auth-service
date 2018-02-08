import { Router } from 'express';
import errorHandler from './errorHandler';
import logger from './logger';

export default function ({ config, db }) {
  const routes = Router();

  // Middleware goes here

  return routes;
}

export { errorHandler, logger };
