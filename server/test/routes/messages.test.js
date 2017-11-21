import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';
import {
  validSignin,
  messagesGroup,
  messagesUsergroups,
  message
} from '../helpers';

const expect = chai.expect;
const api = supertest(app);
const Groups = models.Groups;
const UserGroups = models.Usergroups;


describe('MESSAGES ROUTES', () => {
  let validToken;

  before((done) => {
    api.post('/api/v1/user/signin')
      .send(validSignin)
      .end((err, res) => {
        validToken = res.body.token;
        Groups.create(messagesGroup);
        UserGroups.create(messagesUsergroups);
        done();
      });
  });

  describe('POST: (/api/v1/group/:groupid/message) - Create', () => {
    it('should be an object with keys and values', (done) => {
      api.post('/api/v1/group/1/message')
      .set('x-access-token', validToken)
      .send(message)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('newMessage');
        expect(res.body.newMessage).to.not.equal(null);
        expect(res.body.newMessage).to.have.property('userId');
        expect(res.body.newMessage.userId).to.not.equal(null);
        expect(res.body.newMessage).to.have.property('message');
        expect(res.body.newMessage.message).to.not.equal(null);
        expect(res.body.newMessage).to.have.property('messagePriority');
        expect(res.body.newMessage.messagePriority).to.not.equal(null);
        expect(res.body.newMessage.groupId).to.equal(1);
        expect(res.body.newMessage.userId).to.equal(1);
        done();
      });
    });

    it('should not create message when group is not found', (done) => {
      api.post('/api/v1/group/11/message')
        .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('Group not found');
          done();
        });
    });

    it('should not create message when user is not found', (done) => {
      api.post('/api/v1/group/1/message')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('User not authorized');
            done();
          });
    });
  });

  describe('POST: (/api/v1/group/:groupid/messages) - Retrieve', () => {
    it('should be an object with keys and values', (done) => {
      api.get('/api/v1/group/1/messages')
        .set('x-access-token', validToken)
        .expect(200)
        .end((err, res) => {
          expect(res.body.messages[0].groupId).to.equal(1);
          expect(res.body.messages[0].userId).to.equal(1);
          expect(res.body.messages[0].message).to.equal('Test message');
          expect(res.body.messages[0].messagePriority).to.equal('normal');
          expect(res.body.messages.length).to.equal(1);
          done();
        });
    });

    it('should not retrieve any message when group is not found', (done) => {
      api.get('/api/v1/group/70/messages')
          .set('x-access-token', validToken)
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Group not found');
            done();
          });
    });
  });
});

