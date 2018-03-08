import { Router } from 'express';
import axios from 'axios';

export default function (config) {
  const router = Router();

  router.get('/', (req, res) => {
    const url = `${config.ghLoginUrl}?client_id=${config.ghClientID}&redirect_url=${config.ghCallbackURL}&scope=admin:org,repo,user&state=${Math.random().toString(36).substring(7)}`;
    res.redirect(url);
  });

  router.get('/callback', async (req, res, next) => {
    try {
      const tokenRequest = await axios.post(config.ghTokenUrl, {
        client_id: config.ghClientID,
        client_secret: config.ghClientSecret,
        code: req.query.code,
        state: req.query.state,
      }, {
        headers: {
          Accept: 'application/json',
        },
      });
      res.redirect(`${config.tokenRedirect}?token=${tokenRequest.data.access_token}`);
    } catch (err) {
      next(err);
    }
  });

  return router;
}
