import axios from 'axios';

export async function tokenRequest(fn, req, res, config) {
  const url = `https://api.github.com/applications/${config.ghClientID}/tokens/${req.query.token}`;
  const credentials = Buffer.from(`${config.ghClientID}:${config.ghClientSecret}`).toString('base64');
  try {
    await fn(url, {
      headers: {
        Authorization: `Basic ${credentials}`,
      },
    });
    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(404);
  }
}

export async function validateToken(req, res, config) {
  return tokenRequest(axios.get, req, res, config);
}

export async function deleteToken(req, res, config) {
  return tokenRequest(axios.delete, req, res, config);
}
