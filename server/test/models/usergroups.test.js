/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';


const Usergroups = models.Usergroups;
const Users = models.Users;
const Groups = models.Groups;
const expect = chai.expect;

const userInfo = {
  id: 20,
  email: 'blue@ranger.com',
  username: 'billy',
  phoneNumber: '09082091930',
  password: 'alfalfa'
};

describe('Groups model validation:', () => {
  before((done) => {
    Users.create(userInfo);
    Groups.create({ id: 17, groupname: 'usergroup' });
    done();
  });
  // after((done) => {
  //   Users.destroy({ where: { id: 2 } });
  //   Groups.destroy({ where: { id: 7 } }).then(() => done());
  // });
  it('requires userId field to create a usergroup', () => {
    Usergroups.create({ groupId: 17, userId: null })
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires groupId field to create a usergroup', () => {
    Usergroups.create({ groupId: null, userId: 20 })
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires userId to be an integer or castable to an integer', () => {
    Usergroups.create({ groupId: 17, userId: [20] })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'column "userId" is of type integer but' +
          ' expression is of type integer[]');
      });
  });
  it('requires groupId to be an integer or castable to an integer', () => {
    Usergroups.create({ groupId: [17], userId: 20 })
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'column "groupId" is of type integer but' +
          ' expression is of type integer[]');
      });
  });
});
