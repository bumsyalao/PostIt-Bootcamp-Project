import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';

const expect = chai.expect;
const api = supertest(app);
const Users = models.Users;
const Messages = models.Messages;
const Groups = models.Groups;

const userInfo = {
  email: 'foundation@marykay.com',
  username: 'eyepencil',
  password: 'eyeshadow'
};

describe('MESSAGES ROUTES', () => {
  let validToken;
  before((done) => {
    Groups.create({ id: 5, groupname: 'Route Messages' });
    Users.create(userInfo).then(() => {
      api.post('/api/v1/user/signup')
      .send(userInfo)
      .end((err, res) => {
        validToken = res.body.token;
        done();
      });
    });
  });
  // after((done) => {
  //   Messages.destroy({ where: { message: 'Test message' } });
  //   Users.destroy({ where: { id: 5 } });
  //   Groups.destroy({ where: { id: 5 } }).then(() => done());
  // });
  describe('POST: (/api/v1/group/:groupid/message) - Create', () => {
    it('should be an object with keys and values', (done) => {
      api.post('/api/v1/group/5/message')
      .set({ jwt: validToken })
      .send({ message: 'Test message', messagePriority: 'Urgent' })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('groupId');
        expect(res.body.groupId).to.not.equal(null);
        expect(res.body).to.have.property('userId');
        expect(res.body.userId).to.not.equal(null);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.not.equal(null);
        expect(res.body).to.have.property('messagePriority');
        expect(res.body.messagePriority).to.not.equal(null);
        expect(res.body.groupId).to.equal(5);
        expect(res.body.userId).to.equal(5);
        done();
      });
    });
    it('should not create message when group is not found', (done) => {
      api.post('/api/v1/group/7/message')
        .set({ jwt: validToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Not Found');
          done();
        });
    });
  });
  describe('POST: (/api/v1/group/:groupid/messages) - Retrieve', () => {
    it('should be an object with keys and values', (done) => {
      api.get('/api/v1/group/5/messages')
      .set({ jwt: validToken })
      .expect(200)
      .end((err, res) => {
        expect(res.body[0].groupId).to.equal(5);
        expect(res.body[0].userId).to.equal(5);
        expect(res.body[0].message).to.equal('Test message');
        expect(res.body[0].messagePriority).to.equal('Urgent');
        expect(res.body.length).to.equal(1);
        done();
      });
    });
    it('should not retrieve any message when group is not found', (done) => {
      api.get('/api/v1/group/7/messages')
        .set({ jwt: validToken })
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group Not Found');
          done();
        });
    });
  });
});
