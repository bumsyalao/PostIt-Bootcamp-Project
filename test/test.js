import chai from 'chai';
import supertest from 'supertest';
import app from '../app';
import models from '../server/models';

const expect = chai.expect;
const api = supertest(app);

const chopper = {
  username: 'candy',
  email: 'chooper@anime.com',
  password: 'medicine'
};

const invalidUser = {
  username: 'candy',
  email: 'invalid@test.com',
  password: 'invalid'
};
const nullUser = {
  username: 'desola',
  password: 'invalid'
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
        .send(invalidUser)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('username already in use');
          done();
        });
    });

    it('should throw an error when invalid parameters are passed', (done) => {
      api.post('api/user/signup')
        .send({ username: 67 })
        .end(() => {
          expect(400);
          done();
        });
    });
  });
  describe('POST: (api/user/signin) - signin', () => {
    it('should not signin when supplied invalid email or password', (done) => {
      api.post('api/user/signin')
        .send({
          username: 'desola',
          password: 'null'
        }
        )
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('should not signin when supplied invalid password', (done) => {
      api.post('/user/signin')
        .send({
          username: 'bunmi',
          password: 'isewujfikf'
        })
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.token).to.not.exist;
          done();
        });
    });
    it('should not signin when signin details is incomplete', (done) => {
      api.post('/users/signin')
        .send({
          username: 'bunmi'
        })
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.body.message).to.equal('Incomplete Signin Details');
          done();
        });
    });
  });
});
