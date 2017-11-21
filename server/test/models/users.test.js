/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';
import { userDetails, requiredFields, uniqueFields } from '../helpers';

const Users = models.Users;
const expect = chai.expect;

describe('Users model validation:', () => {
  before((done) => {
    Users.create(userDetails).then(() => done());
  });
  after((done) => {
    Users.destroy({ where: { username: 'zack' } }).then(() => done());
  });

  let user;
  beforeEach((done) => {
    user = Users.build(userDetails);
    done();
  });

  describe('Required Fields', () => {
    requiredFields.forEach((field) => {
      it(`requires ${field} field to create a user`, (done) => {
        user[field] = null;
        user.save()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
            done();
          });
      });
    });
  });

  describe('Unique Fields', () => {
    uniqueFields.forEach((field) => {
      it(`requires ${field} field to be Unique`, (done) => {
        user.save()
          .catch((error) => {
            expect(/UniqueConstraintError/.test(error.name)).to.be.true;
            done();
          });
      });
    });
  });

  describe('Mail Validation', () => {
    it('requires user mail to be authentic', (done) => {
      user.email = 'sugarbad.com';
      user.save()
        .catch((error) => {
          expect(/ValidationError/.test(error.name)).to.be.true;
          done();
        });
    });
  });

  describe('Password Validation', () => {
    let person;
    before((done) => {
      userDetails.email = 'boye@dollars.com';
      userDetails.username = 'lala';
      Users.create(userDetails)
        .then((createdUser) => {
          person = createdUser;
          done();
        });
    });
    after((done) => {
      Users.destroy({ where: { username: 'lala' } }).then(() => done());
    });
    it('should be valid if compared', (done) => {
      expect(person.verifyPassword(userDetails.password)).to.be.true;
      done();
    });
  });
});
