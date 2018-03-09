import axios from 'axios';

export async function tokenRequest(fn, req, res, config, type = 'tokens') {
  const base = 'https://api.github.com/applications';
  const url = `${base}/${config.ghClientID}/${type}/${req.query.token}`;
  const headers = { Authorization: `Basic ${config.ghCredentials()}` };
  try {
    await fn(url, { headers });
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

export async function revokeGrant(req, res, config) {
  return tokenRequest(axios.delete, req, res, config, 'grants');
}

export async function getToken(req, config) {
  const headers = { Accept: 'application/json' };
  const response = await axios.post(config.ghTokenUrl, {
    client_id: config.ghClientID,
    client_secret: config.ghClientSecret,
    code: req.query.code,
    state: req.query.state,
  }, { headers });
  return response.data.access_token;
}
