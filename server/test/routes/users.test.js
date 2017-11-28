import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import {
  clearUserDb,
  clearMessagesDb,
  clearGroupDb,
  clearUserGroupsDb,
  chopper,
  existingUsername,
  invalidEmail,
  nullPassword,
  newUser,
  invalidPassword,
  noUsername,
  validSignin,
} from '../helpers';

const expect = chai.expect;
const api = supertest(app);

clearUserDb();
clearMessagesDb();
clearGroupDb();
clearUserGroupsDb();

describe('ROUTES', () => {
  describe('POST: (/api/v1/user/signup) - Signup', () => {
    it('should return a 200 response', (done) => {
      api.get('/api')
      .set('Accept', 'application/json')
      .expect(200);
      done();
    });

    it('should return object with keys and values', (done) => {
      api.post('/api/v1/user/signup')
      .send(chopper)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        expect(res.body.token).to.not.equal(null);
        expect(res.body).to.have.property('userInfo');
        expect(res.body.userInfo).to.not.equal(null);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.equal('Your account has been created');
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

    it('should not create user with incomplete details', (done) => {
      api.post('/api/v1/user/signup')
        .send()
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Incomplete registration details');
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
        .send(invalidPassword)
        .expect(400)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          done();
        });
    });

    it('should not signin username is not supplied', (done) => {
      api.post('/api/v1/users/signin')
        .send(noUsername)
        .expect(400)
        .end((err, res) => {
          expect(res.body.token).to.not.exist;
          done();
        });
    });

    it('should signin when supplied valid details', (done) => {
      api.post('/api/v1/user/signin')
        .send(validSignin)
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

  describe('GET: (/api/v1/user) - viewUser', () => {
    let validToken;
    before((done) => {
      api.post('/api/v1/user/signup')
          .send(newUser)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            validToken = res.body.token;
            done();
          });
    });
    it('should get a user', (done) => {
      api.get('/api/v1/user')
        .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.body).to.have.property('userInfo');
          expect(res.body.userInfo).to.not.equal(null);
          expect(res.body.userInfo).to.have.property('username');
          expect(res.body.userInfo.username).to.not.equal(null);
          done();
        });
    });

    it('should get Users group', (done) => {
      api.get('/api/v1/user/1/groups')
      .set('x-access-token', validToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('userGroups');
        expect(res.body.userGroups).to.not.equal(null);
        done();
      });
    });

    it('should get all Users', (done) => {
      api.get('/api/v1/users?limit=5&offset=0&searchParam=')
      .set('x-access-token', validToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.not.equal(null);
        expect(res.body.message).to.equal('Users found');
        done();
      });
    });
  });
});
