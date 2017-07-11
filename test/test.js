const should = require('chai').should(),
  expect = require('chai').expect,
  supertest = require('supertest'),
  api = supertest('http://localhost:8000');

describe('User', () => {
  it('should return a 200 response', (done) => {
    api.get('/user/1')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
});
