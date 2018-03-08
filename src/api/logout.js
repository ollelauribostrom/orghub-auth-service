import { Router } from 'express';
import { deleteToken } from '../lib/token';

export default function (config) {
  const router = Router();
  router.get('/', async (req, res) => deleteToken(req, res, config));
  return router;
}
