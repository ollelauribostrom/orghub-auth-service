import { Router } from 'express';
import login from './login';
import logout from './logout';
import status from './status';
import unregister from './unregister';

export default function (config) {
  const api = Router();

  // API routes
  api.use('/login', login(config));
  api.use('/logout', logout(config));
  api.use('/status', status(config));
  api.use('/unregister', unregister(config));

  // Expose something at root
  api.get('/', (req, res) => res.json({ message: 'Yay, Auth service is up and running' }));

  return api;
}
