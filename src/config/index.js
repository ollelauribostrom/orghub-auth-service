import RateLimit from 'express-rate-limit';
import path from 'path';
import env from 'dotenv';

env.load();

export default {
  port: process.env.PORT || 5000,
  prefix: process.env.PREFIX || '/api',
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
  ghCallbackUrl: process.env.GITHUB_CALLBACK_URL,
  appUrl: null,
  ghLoginUrl: 'https://github.com/login/oauth/authorize',
  ghTokenUrl: 'https://github.com/login/oauth/access_token',
  ghCredentials() {
    return Buffer.from(`${this.ghClientID}:${this.ghClientSecret}`).toString('base64');
  },
  setAppUrl(url) {
    this.appUrl = url;
  },
};
