import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);
const request = chai.request(app);

/**
 * GET /api (root)
 */
describe('{api-endpoint}: /api (root)', () => {
  it('it should respond with a message saying that the Auth service is up and running', async () => {
    const { body } = await request.get('/api');
    expect(body.message).to.equal('Yay, Auth service is up and running');
  });
});
