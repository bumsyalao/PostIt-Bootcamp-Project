import chai from 'chai';
import supertest from 'supertest';
import app from '../../../app';
import {
  groupUser,
  group
} from '../helpers';

const expect = chai.expect;
const api = supertest(app);


describe('GROUP ROUTES', () => {
  let validToken;
  before((done) => {
    api.post('/api/v1/user/signup')
      .send(groupUser)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        validToken = res.body.token;
        done();
      });
  });

  describe('POST: (/api/v1/group) - Group', () => {
    let groupid;
    it('should return an object with keys and values', (done) => {
      api.post('/api/v1/group')
      .set('x-access-token', validToken)
      .send(group)
      .expect(200)
      .end((err, res) => {
        expect(res.body.savedGroup).to.have.property('groupName');
        expect(res.body.savedGroup.groupName).to.not.equal(null);
        expect(res.body.savedGroup.groupName).to.equal('People');
        groupid = res.body.savedGroup.groupid;
        done();
      });
    });

    it('should not create another group with same groupName', (done) => {
      api.post('/api/v1/group')
      .set('x-access-token', validToken)
        .send(group)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          expect(res.error.text).to.equal('Group name must be unique');
          done();
        });
    });

    it('should get all groups', (done) => {
      api.get('/api/v1/groups')
      .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.allGroups).to.not.equal(null);
          done();
        });
    });

    it('should return 400 when invalid group is passed', (done) => {
      api.get(`/api/v1/group/${groupid}`)
      .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });

    it('should get group', (done) => {
      api.get('/api/v1/group/1')
      .set('x-access-token', validToken)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.group).to.not.equal(null);
          done();
        });
    });
  });
});
