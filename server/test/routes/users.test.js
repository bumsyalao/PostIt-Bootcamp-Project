import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';

const expect = chai.expect;
const api = supertest(app);


const chopper = {
  username: 'candy',
  email: 'chopper@email.com',
  phoneNumber: '09087667344',
  password: 'medicine'
};

const existingUsername = {
  username: 'candy',
  email: 'invalid@test.com',
  phoneNumber: '09087667344',
  password: 'invalid'
};

const invalidEmail = {
  username: 'userssname',
  email: 'chopper@email.com',
  phoneNumber: '09087667344',
  password: 'invalid'
};

const nullPassword = {
  username: 'tester',
  password: null
};

let token = ''; // eslint-disable-line

describe('ROUTES', () => {
  after((done) => {
    models.Users.destroy({ where: { username: 'candy' } }).then(() => done());
  });

  it('should get token for all tests', (done) => {
    api
    .post('/api/v1/user/signup')
    .send({ chopper
    })
    .end((err, res) => {
      token = res.body.token;
      expect(res.status).to.equal('token');
      res.should.have.status(201);
      done();
    });
  });

  describe('POST: (/api/v1/user/signup) - Signup', () => {
    it('should return a 200 response', (done) => {
      api.get('/api')
      .set('Accept', 'application/json')
      .expect(200, done);
    });
    it('should be an object with keys and values', (done) => {
      api.post('/api/v1/user/signup')
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
      api.post('/api/v1/user/signup')
        .send(existingUsername)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('{"message":"username already in use"}');
          done();
        });
    });
    it('should not create another user with same email', (done) => {
      api.post('/api/v1/user/signup')
        .send(invalidEmail)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('{"message":"email already in use"}');
          done();
        });
    });
  });
  describe('POST: (/api/v1/user/signin) - signin', () => {
    it('should not signin when password is null', (done) => {
      api.post('/api/v1/user/signin')
        .send(nullPassword)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          expect(res.body.message).to.equal('Incomplete login details');
          done();
        });
    });
    it('should not signin when supplied invalid password', (done) => {
      api.post('/api/v1/user/signin')
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
      api.post('/api/v1/users/signin')
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
      api.post('/api/v1/user/signin')
        .send({
          username: 'candy',
          password: 'medicine'
        })
        .end((err, res) => {
          expect(res.body).to.have.property('token');
          expect(res.body.token).to.not.equal(null);
          expect(res.body).to.have.property('userDetails');
          expect(res.body.userDetails).to.not.equal(null);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.not.equal(null);
          expect(res.body.message).to.equal('You have logged in succesfully');
          done();
        });
    });
  });
  // describe('GET: (/api/v1/user) - View User', () => {
  //   it('should return a 200 response', (done) => {
  //     api.get('/api')
  //     .set('Accept', 'application/json')
  //   })
  // }) /api/v1/user/forgot-password
  // describe('Forgot password route /api/v1/user/forgot-password', () => {
  //   describe('Forgot password positive response ', () => {
  //     it('should return a status of 200', (done) => {
  //       api.get('/api')
  //     .post('/api/v1/user/forgot-password')
  //     .set('token', token)
  //     .send({
  //       email: 'chopper@email.com'
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(200);
  //       done();
  //     });
  //     });
  //   });

  //   describe('Forgot password negative response ', () => {
  //     it('it should return a status of 400 when email is not sent', (done) => {
  //       api.get('/api')
  //     .post('/api/v1/user/forgot-password')
  //     .set('token', token)
  //     .send()
  //     .end((err, res) => {
  //       res.should.have.status(400);
  //       done();
  //     });
  //     });

  //     it('it should return a status of 400 when no users is on the platforom with the email', (done) => {
  //       api.get('/api')
  //     .post('/api/v1/user/forgot-password')
  //     .set('token', token)
  //     .send({
  //       email: 'nouseremail@email.com'
  //     })
  //     .end((err, res) => {
  //       res.should.have.status(404);
  //       done();
  //     });
  //     });
  //   });
  // });
});
