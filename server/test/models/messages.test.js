/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';
import { messageInfo } from '../helpers';

const Messages = models.Messages;
const expect = chai.expect;


describe('Messages model validation:', () => {
  it('requires userId field to create a message', (done) => {
    const nullUserId = Object.assign({}, messageInfo);
    nullUserId.userId = null;
    Messages.create(nullUserId)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires groupId field to create a message', (done) => {
    const nullGroupId = Object.assign({}, messageInfo);
    nullGroupId.groupId = null;
    Messages.create(nullGroupId)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires message field to create a message', (done) => {
    const nullMessage = Object.assign({}, messageInfo);
    nullMessage.message = null;
    Messages.create(nullMessage)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires messagePriority field to create a message', (done) => {
    const nullMessagePriority = Object.assign({}, messageInfo);
    nullMessagePriority.messagePriority = null;
    Messages.create(nullMessagePriority)
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires userId to be an integer or castable to an integer', (done) => {
    const invalidUserId = Object.assign({}, messageInfo);
    invalidUserId.userId = [2];
    Messages.create(invalidUserId)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "userId" is of type integer but' +
          ' expression is of type integer[]');
        done();
      });
  });
  it('requires groupId to be an integer or castable to an integer', (done) => {
    const invalidGroupId = Object.assign({}, messageInfo);
    invalidGroupId.groupId = [2];
    Messages.create(invalidGroupId)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeDatabaseError');
        expect(error.message).to.equal(
          'column "groupId" is of type integer but' +
          ' expression is of type integer[]');
        done();
      });
  });
  it('requires message to be a string', (done) => {
    const invalidMessage = Object.assign({}, messageInfo);
    invalidMessage.message = ['ZAGADAT!!!'];
    Messages.create(invalidMessage)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'string violation: message cannot be an array or an object');
        done();
      });
  });
  it('requires messagePriority to be a string', (done) => {
    const invalidMessagePriority = Object.assign({}, messageInfo);
    invalidMessagePriority.messagePriority = ['urgent'];
    Messages.create(invalidMessagePriority)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'string violation: messagePriority cannot be an array or an object');
        done();
      });
  });
  it('requires message to be not be empty', (done) => {
    const emptyMessage = Object.assign({}, messageInfo);
    emptyMessage.message = '   ';
    Messages.create(emptyMessage)
      .catch((error) => {
        expect(error.name).to.equal('SequelizeValidationError');
        expect(error.message).to.equal(
          'Validation error: field must not be empty');
        done();
      });
  });
});
