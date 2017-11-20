/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';


const Messages = models.Messages;
const Users = models.Users;
const UserGroups = models.Usergroups;
const Groups = models.Groups;
const expect = chai.expect;

const userInfo = {
  id: 11,
  email: 'twyse@ereme.com',
  username: 'funny',
  password: 'stuff',
  phoneNumber: '09082091930'
};

const messageInfo = {
  groupId: 2,
  userId: 2,
  message: 'this is a test',
  messagePriority: 'Urgent'
};

describe('Messages model validation:', () => {
  before((done) => {
    Users.create(userInfo);
    Groups.create({ id: 11, groupName: 'messages' });
    UserGroups.create({ groupId: 11, userId: 3, username: 'funny', groupName: 'messages' });
    done();
  });
  // after((done) => {
  //   UserGroups.destroy({ where: { groupName: 'messages' } });
  //   Groups.destroy({ where: { id: 11 } });
  //   Users.destroy({ where: { id: 11 } })
  //   .then(() => done());
  // });
  it('requires userId field to create a message', () => {
    const nullUserId = Object.assign({}, messageInfo);
    nullUserId.userId = null;
    Messages.create(nullUserId)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires groupId field to create a message', () => {
    const nullGroupId = Object.assign({}, messageInfo);
    nullGroupId.groupId = null;
    Messages.create(nullGroupId)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires message field to create a message', () => {
    const nullMessage = Object.assign({}, messageInfo);
    nullMessage.message = null;
    Messages.create(nullMessage)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires messagePriority field to create a message', () => {
    const nullMessagePriority = Object.assign({}, messageInfo);
    nullMessagePriority.messagePriority = null;
    Messages.create(nullMessagePriority)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires userId to be an integer or castable to an integer', () => {
    const invalidUserId = Object.assign({}, messageInfo);
    invalidUserId.userId = [2];
    Messages.create(invalidUserId)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "userId" is of type integer but' +
          ' expression is of type integer[]');
      });
  });
  it('requires groupId to be an integer or castable to an integer', () => {
    const invalidGroupId = Object.assign({}, messageInfo);
    invalidGroupId.groupId = [2];
    Messages.create(invalidGroupId)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "groupId" is of type integer but' +
          ' expression is of type integer[]');
      });
  });
  it('requires message to be a string', () => {
    const invalidMessage = Object.assign({}, messageInfo);
    invalidMessage.message = ['ZAGADAT!!!'];
    Messages.create(invalidMessage)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'string violation: message cannot be an array or an object');
      });
  });
  it('requires messagePriority to be a string', () => {
    const invalidMessagePriority = Object.assign({}, messageInfo);
    invalidMessagePriority.messagePriority = ['urgent'];
    Messages.create(invalidMessagePriority)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'string violation: messagePriority cannot be an array or an object');
      });
  });
  it('requires message to be not be empty', () => {
    const emptyMessage = Object.assign({}, messageInfo);
    emptyMessage.message = '   ';
    Messages.create(emptyMessage)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'Validation error: field must not be empty');
      });
  });
});
