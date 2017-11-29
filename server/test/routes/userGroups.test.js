import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';
import {
  usergroupSignin,
  usergroupGroup,
  usergroupUser,
  usergroupsUsergroup
} from '../helpers';

const expect = chai.expect;
const api = supertest(app);
const Users = models.Users;
const UserGroups = models.UserGroups;
const Groups = models.Groups;


describe('USERGROUP ROUTES', () => {
  let validToken;
  before((done) => {
    api.post('/api/v1/user/signup')
      .send(usergroupSignin)
      .end((err, res) => {
        validToken = res.body.token;
        Groups.create(usergroupGroup);
        Users.create(usergroupUser);
        UserGroups.create(usergroupsUsergroup);
        done();
      });
  });

  describe('POST: (/api/v1/group/:groupid/user/:userid) - Create', () => {
    it('should not add user to group which user is already in', (done) => {
      api.post('/api/v1/group/1/user/1')
        .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('User Already in group');
          done();
        });
    });
  });

  describe('POST: (/api/v1/group/:groupid/user/) - User Group Test', () => {
    Groups.create({ groupName: 'abcdef' });
    it('should add user to a group', (done) => {
      api.post('/api/v1/group/2/user')
      .set('x-access-token', validToken)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.not.equal(null);
        expect(res.body.message).to.equal('User succesfully added to group');
        done();
      });
    });

    it('should not add user to group which user is already in', (done) => {
      api.post('/api/v1/group/2/user')
        .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('User already in group');
          done();
        });
    });

    it('should list all users in group', (done) => {
      api.get('/api/v1/group/1/users')
        .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('users');
          expect(res.body.users).to.not.equal(null);
          done();
        });
    });

    it('should return error if no user is found', (done) => {
      api.get('/api/v1/group/2/users')
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.body.message).to.equal('User not authorized');
          done();
        });
    });
  });
});
