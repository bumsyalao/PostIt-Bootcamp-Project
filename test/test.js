import chai from 'chai';
import supertest from 'supertest';

const should = chai.should();
const expect = chai.expect;
const api = supertest('http://localhost:8000');

describe('User', () => {
  it('should return a 200 response', (done) => {
    api.get('/user/1')
    .set('Accept', 'application/json')
    .expect(200, done);
  });
  it('should be an object with keys and values', (done) => {
    api.get('/users/1')
    .set('Accept', 'application/json')
    .expect(200)
    .end((err, res) => {
      expect(res.body).to.have.property('username');
      expect(res.body.username).to.not.equal(null);
      expect(res.body).to.have.property('email');
      expect(res.body.email).to.not.equal(null);
      expect(res.body).to.have.property('password');
      expect(res.body.password).to.not.equal(null);
      done();
    });
  });

  it('should be updated with a new user', (done) => {
    api.put('/user/1')
    .set('Accept', 'application/x-www-form-urlencoded')
    .send({
      username: 'bunmi',
      email: 'bunmi@email.com',
      password: 'password12'
    })
    .expect(200)
    .end((err, res) => {
      expect(res.body.username).to.equal('bunmi');
      expect(res.body.email).to.equal('bunmi@email.com');
      expect(res.body.password).to.equal('password12');
      done();
    });
  });

  it('should not be able to acess other ')
});
