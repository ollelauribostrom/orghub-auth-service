import { Router } from 'express';
import login from './login';

export default function (config) {
  const api = Router();

  // API routes
  api.use('/login', login(config));

  // Expose something at root
  api.get('/', (req, res) => res.json({ message: 'Yay, Auth service is up and running' }));

  return api;
}
