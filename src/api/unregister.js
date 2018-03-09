import { Router } from 'express';
import { revokeGrant } from '../lib/token';

export default function (config) {
  const router = Router();
  router.get('/', async (req, res) => revokeGrant(req, res, config));
  return router;
}
