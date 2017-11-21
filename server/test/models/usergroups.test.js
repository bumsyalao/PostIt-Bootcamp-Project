/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';
import { invalidUserid, invalidGroupid } from '../helpers';


const Usergroups = models.Usergroups;
const expect = chai.expect;


describe('Groups model validation:', () => {
  it('requires userId field to create a usergroup', (done) => {
    Usergroups.create(invalidUserid)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires groupId field to create a usergroup', (done) => {
    Usergroups.create(invalidGroupid)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires userId to be an integer or castable to an integer', (done) => {
    Usergroups.create({ username: 'Foo', groupName: 'Bar', groupId: 17, userId: [20] })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "userId" is of type integer but' +
          ' expression is of type integer[]');
        done();
      });
  });
  it('requires groupId to be an integer or castable to an integer', (done) => {
    Usergroups.create({ username: 'Foo', groupName: 'Bar', groupId: [17], userId: 20 })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "groupId" is of type integer but' +
          ' expression is of type integer[]');
        done();
      });
  });
});
