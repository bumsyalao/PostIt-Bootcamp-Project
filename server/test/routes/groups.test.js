import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import models from '../../../server/models';

const expect = chai.expect;
const api = supertest(app);
const Groups = models.Groups;
const UserGroups = models.Usergroups;
const Users = models.Users;
const group = {
  groupName: 'People',
};
const userInfo = {
  id: 4,
  email: 'zugzwang@chess.com',
  username: 'winner',
  password: 'waitingMove',
  phoneNumber: '09082091930'
};


describe('GROUP ROUTES', () => {
  let validToken;
  before((done) => {
    Users.create(userInfo).then(() => {
      api.post('/api/v1/user/signin')
      .send(userInfo)
      .end((err, res) => {
        validToken = res.body.token;
        done();
      });
    });
  });
  after((done) => {
    UserGroups.destroy({ where: { groupName: 'People' } });
    Groups.destroy({ where: { groupName: 'People' } }).then(() => done());
  });

  describe('POST: (/api/v1/group) - Create', () => {
    it('should be an object with keys and values', (done) => {
      api.post('/api/v1/group')
      .set({ jwt: validToken })
      .send(group)
      .expect(200)
      .end((err, res) => {
        // expect(res.header).to.have.property('x-access-token');
        // expect(res.header.token).to.not.equal(null);
        expect(res.body).to.have.property('groupName');
        expect(res.body.groupName).to.not.equal(null);
        expect(res.body.groupName).to.equal('People');
        done();
      });
    });
    it('should not create another group with same groupName', (done) => {
      api.post('/api/v1/group')
      .set({ jwt: validToken })
        .send(group)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.error.text).to.equal('Group name must be unique');
          done();
        });
    });
  });
});
