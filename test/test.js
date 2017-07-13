import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import models from '../../../server/models';


const should = chai.should();
const expect = chai.expect;
const api = supertest('http://localhost:8000');

describe('POST: (/api/user/signup) - Signin', () => {
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

  it('should not create another user with same email', (done) => {
    req.post('/users')
      .send('bunmi')
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal(
      `Email: ${bunmi.email} is already in use`);
        done();
      });
  });

  it('should not create another user with same username', (done) => {
    bunmi.email = 'bunmi@email.com';
    req.post('/users')
      .send(bunmi)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body.message).to.equal(
      `Username: ${bunmi.username} is already in use`);
        done();
      });
  });

  it('should throw an error when invalid parameters are passed', (done) => {
    req.post('/users')
      .send({ username: 67 })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        done();
      });
  });
describe('POST: (/users/signin) - signin', () => {
  it('should not signin when supplied invalid email or password',
  (done) => {
    req.post('/users/signin')
      .send({
        email: 'desolacoker@email.com',
        password: 'password'
      })
      .end((error, response) => {
        expect(response.status).to.equal(400);
        expect(response.body.token).to.not.exist;
        done();
      });
  });
  it('should not signin when supplied invalid password',
  (done) => {
    req.post('/users/signin')
      .send({
        username: bunmi.username,
        password: 'isewujfikf'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.token).to.not.exist;
        done();
      });
  });
  it('should not signin when signin details is incomplete',
  (done) => {
    request.post('/users/signin')
      .send({
        username: bunmi.username
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('Incomplete Signin Details');
        done();
      });
  
  });
