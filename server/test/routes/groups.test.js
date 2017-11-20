import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';

const expect = chai.expect;
const api = supertest(app);
const Groups = models.Groups;
const Users = models.Users;
const group = {
  groupName: 'People',
};
const userInfo = {
  email: 'zugzwang@chess.com',
  username: 'winnerdf',
  password: 'waitingMove',
  phoneNumber: '09082091930'
};


describe('GROUP ROUTES', () => {
  let validToken;
  before((done) => {
    Users.create(userInfo).then(() => {
      api.post('/api/v1/user/signup')
      .send(userInfo)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        validToken = res.body.token;
        done();
      });
    });
  });
  // after((done) => {
  //   Users.destroy({ where: { username: userInfo.username } });
  //   Groups.destroy({ where: { groupName: group.groupName } }).then(() => done());
  // });

  describe('POST: (/api/v1/group) - Create', () => {
    it('should take an object with keys and values', (done) => {
      api.post('/api/v1/group')
      .set('jwt', validToken)
      .send(group)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('groupName');
        expect(res.body.groupName).to.not.equal(null);
        expect(res.body.groupName).to.equal('People');
        done();
      });
    });
    it('should not create another group with same groupName', (done) => {
      api.post('/api/v1/group')
      .set('jwt', validToken)
        .send(group)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.error.text).to.equal('Group name must be unique');
          done();
        });
    });
  });
});
