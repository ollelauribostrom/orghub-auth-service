import { Router } from 'express';
import { validateToken } from '../lib/token';

export default function (config) {
  const router = Router();
  router.get('/', async (req, res) => validateToken(req, res, config));
  return router;
}
