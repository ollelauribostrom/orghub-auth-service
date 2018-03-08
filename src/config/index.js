import RateLimit from 'express-rate-limit';
import path from 'path';
import env from 'dotenv';

env.load();

export default {
  port: process.env.PORT || 5000,
  prefix: process.env.PREFIX || '/api',
  dbAddress: process.env.DBADRESS,
  bodyParser: { limit: '100kb' },
  cors: { exposedHeaders: ['Link'] },
  logDirectory: path.join(__dirname, '/../../logs'),
  rateLimit: new RateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    delayMs: 0,
  }),
  ghClientID: process.env.GITHUB_CLIENT_ID,
  ghClientSecret: process.env.GITHUB_CLIENT_SECRET,
  ghCallbackURL: process.env.GITHUB_CALLBACK_URL,
  ghLoginUrl: 'https://github.com/login/oauth/authorize',
  ghTokenUrl: 'https://github.com/login/oauth/access_token',
  tokenRedirect: process.env.TOKEN_REDIRECT,
};
