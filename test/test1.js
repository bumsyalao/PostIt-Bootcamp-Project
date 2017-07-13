import chai from 'chai';
import supertest from 'supertest';
import app from '../../../server';
import models from '../../../server/models';

describe('User ROUTES', () => {
  let user1;
  let token1;
  let token3;
  let token4;
  let token5;

  describe('REQUESTS', () => {
    before((done) => {
      req.post('/users')
        .send(skodo)
        .end((error, response) => {
          user1 = response.body.newUser;
          token1 = response.body.token;
          document.ownerId = skodo.id;
          models.Documents.create(document);

          request.post('/users/login')
            .send(doe)
            .end((err, res) => {
              token5 = res.body.token;

              request.post('/users/login')
                .send(segun)
                .end((err, res) => {
                  token3 = res.body.token;

                  request.post('/users/login')
                    .send(superAdmin)
                    .end((err, res) => {
                      token4 = res.body.token;
                      done();
                    });
                });
            });
        });
    });
    it('should not create another user with same email', (done) => {
      request.post('/users')
        .send(john)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal(
        `Email: ${john.email} is already in use`);
          done();
        });
    });
    it('should not create another user with same username', (done) => {
      john.email = 'shoki@yodi.com';
      request.post('/users')
        .send(john)
        .end((error, response) => {
          expect(response.status).to.equal(409);
          expect(response.body.message).to.equal(
        `Username: ${john.userName} is already in use`);
          done();
        });
    });
    it('should get all users when provided valid token & access', (done) => {
      request.get('/users')
        .set({ 'x-access-token': token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          expect(Array.isArray(Object.keys(response.body))).to.be.true;
          expect(response.body.users.length).to.be.greaterThan(0);
          done();
        });
    });
    it('should throw an error when invalid params are passed', (done) => {
      request.post('/users')
        .send({ firstName: 67 })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          done();
        });
    });

    describe('GET: (/users/:id) - GET A USER', () => {
      it('should not return a user if id is invalid', (done) => {
        request.get('/users/345')
        .set({ Authorization: token1 })
        .expect(404);
        done();
      });
    });

    describe('PUT: (/users/:id) - UPDATE', () => {
      it('should not perform update if supplied id is invalid', (done) => {
        request.put('/users/333')
          .set({ Authorization: token1 })
          .expect(401);
        done();
      });
      it('should update a user if supplied id is valid', (done) => {
        const fieldsToUpdate = {
          firstName: 'Shegzy',
          lastName: 'Olobe'
        };
        request.put(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(fieldsToUpdate.firstName);
            done();
          });
      });
      it('should not update a user if you are not the user nor admin',
      (done) => {
        const fieldsToUpdate = {
          firstName: 'Shegzy',
          lastName: 'Olobe'
        };
        request.put('/users/2')
          .set({ Authorization: token3 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You cannot edit this user');
            done();
          });
      });
      it('should not update the superadmin even if you are admin',
      (done) => {
        const fieldsToUpdate = {
          firstName: 'Shegzy',
          lastName: 'Olobe'
        };
        request.put('/users/1')
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You cannot edit this admin: the OGA at the top!!!');
            done();
          });
      });
      it('should only be able to update a regular user role as admin',
      (done) => {
        const fieldsToUpdate = {
          firstName: 'Shegzy',
          lastName: 'Olobe'
        };
        request.put('/users/3')
          .set({ Authorization: token1 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You can only promote/demote another user.');
            done();
          });
      });
      it('should not be able to update super admin role',
      (done) => {
        const fieldsToUpdate = {
          roleId: '2'
        };
        request.put('/users/1')
          .set({ Authorization: token4 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message)
              .to.equal('To avoid complications, this is forbidden!');
            done();
          });
      });
      it('should not allow regular users to update their role',
      (done) => {
        const fieldsToUpdate = {
          roleId: '1'
        };
        request.put('/users/3')
          .set({ Authorization: token3 })
          .send(fieldsToUpdate)
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You cannot promote yourself to an admin.');
            done();
          });
      });
    });
describe('GET: (/search/users) - SEARCH FOR USERS', () => {
      it('should get all users that match search query', (done) => {
        request.get(`/search/users/?search=${user1.username}`)
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
    describe('DELETE: (/users/:id) - DELETE A USER', () => {
      it('should not delete admin if not admin', (done) => {
        request.delete('/users/5')
          .set({ Authorization: token3 })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('Cannot delete admin.');
            done();
          });
      });
      it('should not perform a delete if supplied id is invalid', (done) => {
        request.delete('/users/100')
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(404);
            expect(response.body.message)
              .to.equal('User not found');
            done();
          });
      });
      it('should not perform a delete on super admin', (done) => {
        request.delete('/users/1')
          .set({ Authorization: token4 })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message)
              .to.equal('Hmmm... the OGA at the top! DON\'T TRY IT!!!');
            done();
          });
      });
      it('should not delete if requester is not user nor admin', (done) => {
        request.delete('/users/2')
          .set({ Authorization: token3 })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.message)
              .to.equal('You cannot delete this user');
            done();
          });
      });
      it('should not delete a user who still has documents', (done) => {
        request.delete('/users/3')
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(409);
            expect(response.body.message)
              .to.equal('Cannot delete user while user still has documents');
            models.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(7);
                done();
              });
          });
      });
      it('should succesfully delete a user when provided valid id', (done) => {
        request.delete(`/users/${user1.id}`)
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            models.User.count()
              .then((userCount) => {
                expect(userCount).to.equal(6);
                done();
              });
          });
      });
      it('should perform delete on request from admin', (done) => {
        request.delete('/users/4')
        .set({ Authorization: token1 })
        .end((error, response) => {
          expect(response.status).to.equal(200);
          done();
        });
      });
    });

    describe('POST: (/users/login) - LOGIN', () => {
      it('should not login when supplied invalid email or password',
      (done) => {
        request.post('/users/login')
          .send({
            email: 'userName@mail.com',
            password: 'password'
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should not login when supplied invalid username',
      (done) => {
        request.post('/users/login')
          .send({
            userName: 'Pianku',
            password: 'password'
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should not login when supplied invalid password',
      (done) => {
        request.post('/users/login')
          .send({
            userName: segun.userName,
            password: 'shokolokobngoshewu'
          })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            expect(response.body.token).to.not.exist;
            done();
          });
      });
      it('should not login when supplied incomplete login details',
      (done) => {
        request.post('/users/login')
          .send({
            userName: segun.userName
          })
          .end((error, response) => {
            expect(response.status).to.equal(400);
            expect(response.body.message).to.equal('Incomplete login details');
            done();
          });
      });
      it('should login when supplied valid email & password', (done) => {
        request.post('/users/login')
          .send(segun)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.token).to.exist;
            expect(response.body.expiresIn).to.exist;
            done();
          });
      });
    });

    describe('GET: (/users/profile) - PROFILE', () => {
      it('should return the profile of a logged in user', (done) => {
        request.get('/users/profile')
          .set({ Authorization: token3 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body.firstName).to.equal(segun.firstName);
            done();
          });
      });
      it('should not find the profile of a user not logged in', (done) => {
        request.get('/users/profile')
          .end((error, response) => {
            expect(response.status).to.equal(401);
            done();
          });
      });
      it('should not find the profile of a user with invalid token', (done) => {
        request.get('/users/profile')
          .set({ Authorization: 'xyzhd321' })
          .end((error, response) => {
            expect(response.status).to.equal(401);
            done();
          });
      });
    });

    describe('GET: (/users/admin) - GET ALL ADMIN', () => {
      it('should get all admins present', (done) => {
        request.get('/users/admin')
          .set({ Authorization: token1 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
      it('should not get admins if not admin making request', (done) => {
        request.get('/users/admin')
          .set({ Authorization: token5 })
          .end((error, response) => {
            expect(response.status).to.equal(403);
            expect(response.body.message).to
              .equal('You are not authorized to view this content');
            done();
          });
      });
    });

    describe('POST: (/users/logout) - LOGOUT', () => {
      it('should logout a user', (done) => {
        request.post('/users/logout')
          .set({ Authorization: token3 })
          .end((error, response) => {
            expect(response.status).to.equal(200);
            done();
          });
      });
    });
  });
});