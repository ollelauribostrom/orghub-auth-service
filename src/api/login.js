import { Router } from 'express';
import axios from 'axios';
import { getToken } from '../lib/token';

export default function (config) {
  const router = Router();

  router.get('/', (req, res) => {
    const base = config.ghLoginUrl;
    const id = config.ghClientID;
    const redirect = config.ghCallbackURL;
    const state = Math.random().toString(36).substring(7);
    const scope = 'admin:org,repo,user';
    const url = `${base}?client_id=${id}&redirect_url=${redirect}&scope=${scope}&state=${state}`;
    res.redirect(url);
  });

  router.get('/callback', async (req, res, next) => {
    try {
      const token = await getToken(req, config);
      const headers = { Authorization: `token ${token}` };
      const user = await axios.get('https://api.github.com/user', { headers });
      res.redirect(`${config.ghTokenRedirectUrl}?token=${token}&username=${user.data.login}`);
    } catch (err) {
      res.redirect(`${config.ghTokenRedirectUrl}?error=${err.message}`);
    }
  });

  return router;
}
