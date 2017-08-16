import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import models from '../../server/models';

const expect = chai.expect;
const api = supertest(app);
const Users = models.Users;
const Usergroups = models.Usergroups;
const Groups = models.Groups;

const userInfo = {
  id: 4,
  email: 'zugzwang@chess.com',
  username: 'winner',
  password: 'waitingMove'
};

describe('USERGROUP ROUTES', () => {
  let validToken;
  before((done) => {
    Groups.create({ id: 4, groupname: 'Route Usergroup' });
    Users.create(userInfo).then(() => {
      api.post('/api/user/signin')
      .send(userInfo)
      .end((err, res) => {
        validToken = res.body.token;
        done();
      });
    });
  });
  after((done) => {
    Usergroups.destroy({ where: { userId: 4 } });
    Users.destroy({ where: { id: 4 } });
    Groups.destroy({ where: { id: 4 } }).then(() => done());
  });
  describe('POST: (/api/group/:groupid/user) - Create', () => {
    it('should be an object with keys and values', (done) => {
      api.post('/api/group/4/user')
      .set({ jwt: validToken })
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('groupId');
        expect(res.body.groupId).to.not.equal(null);
        expect(res.body).to.have.property('userId');
        expect(res.body.userId).to.not.equal(null);
        expect(res.body.groupId).to.equal(4);
        expect(res.body.userId).to.equal(4);
        done();
      });
    });
    it('should not add user to group which user is already in', (done) => {
      api.post('/api/group/4/user')
        .set({ jwt: validToken })
        .end((err, res) => {
          expect(res.status).to.equal(409);
          expect(res.body.message).to.equal('User already in group');
          done();
        });
    });
  });
});
