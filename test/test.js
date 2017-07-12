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
  it ('should be an object with keys and values', (done) => {
    api.get('/users/1')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err,res) => {
      expect(res.body).to.have.property("username");
      expect(res.body.username).to.not.equal(null);
      expect(res.body).to.have.property("email");
      expect(res.body.email).to.not.equal(null);
      expect(res.body).to.have.property("password");
      expect(res.body.password).to.not.equal(null);
      done();
    });
});
