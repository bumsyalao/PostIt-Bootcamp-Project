/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';
import { newGroup, emptyGroupname, nullGroupname } from '../helpers';

const Groups = models.Groups;
const expect = chai.expect;

describe('Groups model validation:', () => {
  before((done) => {
    Groups.create(newGroup).then(() => done());
  });
  after((done) => {
    Groups.destroy({ where: newGroup }).then(() => done());
  });
  it('requires groupName field to create a group', (done) => {
    const group = Groups.build(nullGroupname);
    group.save()
      .catch((error) => {
        expect(/notNull Violation/.test(error.message)).to.be.true;
        done();
      });
  });
  it('requires groupName field to not be empty', (done) => {
    const group = Groups.build(emptyGroupname);
    group.save()
      .catch((error) => {
        expect(/Validation error/.test(error.message)).to.be.true;
        expect(error.message).to.equal(
          'Validation error: field must not be empty');
        done();
      });
  });
  it('requires groupName to be unique', (done) => {
    const group = Groups.build(newGroup);
    group.save()
      .catch((error) => {
        expect(/UniqueConstraintError/.test(error.name)).to.be.true;
        done();
      });
  });
});
