/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';

const Groups = models.Groups;
const UserGroups = models.Usergroups;
const Message = models.Message;
const expect = chai.expect;

describe('Groups model validation:', () => {
  before((done) => {
    Groups.create({ groupName: 'test' });
    UserGroups.create({ groupId: 1,
      userId: 1,
      username: 'sunflower',
      groupName: 'test' });
    done();
  });
  after((done) => {
    UserGroups.destroy({ where: { groupName: 'test' } });
    Groups.destroy({ where: { groupName: 'test' } }).then(() => done());
  });
  it('requires groupName field to create a group', () => {
    const group = Groups.build({ groupName: null });
    group.save()
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires groupName field to not be empty', () => {
    const group = Groups.build({ groupName: ' ' });
    group.save()
      .catch((error) => {
        expect(/Validation error/.test(error.message)).to.be.true;
        expect(error.message).to.equal(
          'Validation error: field must not be empty');
      });
  });
  it('requires groupName to be unique', () => {
    const group = Groups.build({ groupName: 'test' });
    group.save()
      .catch((error) => {
        expect(/UniqueConstraintError/.test(error.name)).to.be.true;
      });
  });
});
