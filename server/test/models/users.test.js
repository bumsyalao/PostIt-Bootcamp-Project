/* eslint-disable no-unused-expressions */
import chai from 'chai';
import models from '../../models';

const Users = models.Users;
const expect = chai.expect;

const userInfo = {
  email: 'power.rangers@super.com',
  username: 'zack',
  password: 'alfalfa',
  phoneNumber: '09082091930'
};

const requiredFields = [
  'username', 'email', 'password', 'phoneNumber'];

const uniqueFields = ['email', 'username'];


describe('Users model validation:', () => {
  // after((done) => {
  //   Users.destroy({ where: { username: 'zack' } }).then(() => done());
  // });

  let user;
  beforeEach((done) => {
    user = Users.build(userInfo);
    done();
  });

  describe('Required Fields', () => {
    requiredFields.forEach((field) => {
      it(`requires ${field} field to create a user`, () => {
        user[field] = null;
        return user.save()
          .catch((error) => {
            expect(/notNull Violation/.test(error.message)).to.be.true;
          });
      });
    });
  });

  describe('Unique Fields', () => {
    uniqueFields.forEach((field) => {
      it(`requires ${field} field to be Unique`, () => {
        user.save()
          .catch((error) => {
            expect(/UniqueConstraintError/.test(error.name)).to.be.true;
          });
      });
    });
  });

  describe('Mail Validation', () => {
    it('requires user mail to be authentic', () => {
      user.email = 'sugarbad.com';
      return user.save()
        .catch((error) => {
          expect(/ValidationError/.test(error.name)).to.be.true;
        });
    });
  });

  describe('Password Validation', () => {
    let person;
    before((done) => {
      userInfo.email = 'boye@dollars.com';
      userInfo.username = 'lala';
      Users.create(userInfo)
        .then((createdUser) => {
          person = createdUser;
          done();
        });
    });
    after((done) => {
      Users.destroy({ where: { username: 'lala' } }).then(() => done());
    });
    it('should be valid if compared', () => {
      expect(person.verifyPassword(userInfo.password)).to.be.true;
    });
  });
});
