import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import models from '../../server/models';

const expect = chai.expect;
const api = supertest(app);

const chopper = {
  username: 'candy',
  email: 'chopper@anime.com',
  password: 'medicine'
};

const existingUsername = {
  username: 'candy',
  email: 'invalid@test.com',
  password: 'invalid'
};

const invalidEmail = {
  username: 'userssname',
  email: 'chopper@anime.com',
  password: 'invalid'
};

const nullPassword = {
  username: 'desola',
  password: null
};

describe('ROUTES', () => {
  after((done) => {
    models.Users.destroy({ where: { username: 'candy' } }).then(() => done());
  });
  describe('POST: (/api/user/signup) - Signup', () => {
    it('should return a 200 response', (done) => {
      api.get('/api')
      .set('Accept', 'application/json')
      .expect(200, done);
    });
    it('should be an object with keys and values', (done) => {
      api.post('/api/user/signup')
      .send(chopper)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.not.equal(null);
        expect(res.body).to.have.property('userInfo');
        expect(res.body.userInfo).to.not.equal(null);
        done();
      });
    });
    it('should not create another user with same username', (done) => {
      api.post('/api/user/signup')
        .send(existingUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('{"message":"username already in use"}');
          done();
        });
    });
    it('should not create another user with same email', (done) => {
      api.post('/api/user/signup')
        .send(invalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('{"message":"email already in use"}');
          done();
        });
    });
  });
  describe('POST: (/api/user/signin) - signin', () => {
    it('should not signin when password is null', (done) => {
      api.post('/api/user/signin')
        .send(nullPassword)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          expect(res.body.message).to.equal('Incomplete login details');
          done();
        });
    });
    it('should not signin when supplied invalid password', (done) => {
      api.post('/api/user/signin')
        .send({
          username: 'candy',
          password: 'isewujfikf'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          done();
        });
    });
    it('should not signin username is not supplied', (done) => {
      api.post('/api/users/signin')
        .send({
          password: 'medicine'
        })
        .expect(400)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          done();
        });
    });
    it('should signin when supplied valid details', (done) => {
      api.post('/api/user/signin')
        .send({
          username: 'candy',
          password: 'medicine'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.equal(null);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.not.equal(null);
          expect(res.body.success).to.equal(true);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.equal('You have logged in succesfully');
          done();
        });
    });
  });
});
