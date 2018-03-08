import { Router } from 'express';
import login from './login';
import authorize from './authorize';
import logout from './logout';

export default function (config) {
  const api = Router();

  // API routes
  api.use('/login', login(config));
  api.use('/authorize', authorize(config));
  api.use('/logout', logout(config));

  // Expose something at root
  api.get('/', (req, res) => res.json({ message: 'Yay, Auth service is up and running' }));

  return api;
}
