import chai from 'chai';
import supertest from 'supertest';
import app from '../../app';
import models from '../../server/models';

const expect = chai.expect;
const api = supertest(app);
const Groups = models.Groups;

const group = {
  groupname: 'People',
};


describe('GROUP ROUTES', () => {
  after((done) => {
    Groups.destroy({ where: { groupname: 'People' } }).then(() => done());
  });
  describe('POST: (/api/group) - Create', () => {
    it('should be an object with keys and values', (done) => {
      api.post('/api/group')
      .send(group)
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('groupname');
        expect(res.body.groupname).to.not.equal(null);
        expect(res.body.groupname).to.equal('People');
        done();
      });
    });
    it('should not create another group with same groupname', (done) => {
      api.post('/api/group')
        .send(group)
        .end((err, res) => {
          expect(res.status).to.equal(401);
          expect(res.error.text).to.equal('Group name must be unique');
          done();
        });
    });
  });
});
