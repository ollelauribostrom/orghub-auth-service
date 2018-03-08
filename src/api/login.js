import { Router } from 'express';
import axios from 'axios';

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
      const headers = { headers: { Accept: 'application/json' } };
      const tokenRequest = await axios.post(config.ghTokenUrl, {
        client_id: config.ghClientID,
        client_secret: config.ghClientSecret,
        code: req.query.code,
        state: req.query.state,
      }, headers);
      res.redirect(`${config.tokenRedirect}?token=${tokenRequest.data.access_token}`);
    } catch (err) {
      res.redirect(`${config.tokenRedirect}?err=${err.message}`);
    }
  });

  return router;
}
