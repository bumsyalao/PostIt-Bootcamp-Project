/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';

const Groups = models.Groups;
const expect = chai.expect;

describe('Groups model validation:', () => {
  before((done) => {
    Groups.create({ groupname: 'test' });
    done();
  });
  after((done) => {
    Groups.destroy({ where: { groupname: 'test' } }).then(() => done());
  });
  it('requires groupname field to create a group', () => {
    const group = Groups.build({ groupname: null });
    group.save()
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
      });
  });
  it('requires groupname field to not be empty', () => {
    const group = Groups.build({ groupname: ' ' });
    group.save()
      .catch((error) => {
        expect(/Validation error/.test(error.message)).to.be.true;
        expect(error.message).to.equal(
          'Validation error: field must not be empty');
      });
  });
  it('requires groupname to be unique', () => {
    const group = Groups.build({ groupname: 'test' });
    group.save()
      .catch((error) => {
        expect(/UniqueConstraintError/.test(error.name)).to.be.true;
      });
  });
});
