import { Router } from 'express';

export default function ({ config, db }) {
  const api = Router();

  // API routes
  // api.use('/someroute', someroute({ config, db }));

  // Expose something at root
  api.get('/', (req, res) => res.json({ message: 'Yay, Auth service is up and running' }));

  return api;
}
