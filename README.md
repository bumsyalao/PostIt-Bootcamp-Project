# PostIt-Bootcamp-Project

A cool App that allows users create groups and post notifications to group.

It provides restful APIs for users to create groups, post messages and retrieve messages based on userId and managing authentication of users with JsonWebToken.

#### Hosted App on Heroku 
[Post-it](https://postitnow.herokuapp.com/)


## API Documentation
-----
The API has routes, each dedicated to a single task that uses HTTP response codes to indicate API status and errors.

### Authentication

It uses JSON Web Token (JWT) for authentication.

It generates a token on successful login or account creation and returns it to the user.

It verifies the token to ensures a user is authenticated to access protected endpoints.

### Users

It allows users to be created.

It allows users to login and obtain a token

It allows authenticated users to create groups.

It allows authenticated users to post messages.

It allows for authenticated users to post messages.


EndPoint                          |   Functionality                      
----------------------------------|------------------------
POST api/user/signup              |creates a new user.
POST api/user/signin              |sign in an already created user.
POST api/group	                  |a user creates a group.
POST api/group/:groupid/user	    |a user adds other users to group.
POST api/group/:groupid/message	  |a user posts messages to group.
GET api/group/:groupid/messages	  |retrieves message posted to a group.


The following are some sample requests and responses from the API.

##### Users
Create user
Get user

##### Groups
Creates new group
Add users to group

##### Messages
Post message to group
Retrieve message from group.

### Endpoint for Users API.
Sign up User

#### Request
- Endpoint: POST: `api/user/signup`
- Body `(application/json)`
```json
{
  "username": "bootcampuser",
  "email": "bootcamp@gmail.com",
  "password": "password"
}
```
#### Response
- Status: `201: Created`
- Body `(application/json)`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoiYm9vdGNhbXB1c2VyIiwiZW1haWwiOiJib290Y2FtcEBnbWFpbC5jb20iLCJpYXQiOjE0OTk5NDgyMDEsImV4cCI6MTUwMDAzNDYwMX0.pPDBamQ9Bu1YQmrFuU5SX39jMC2Urx4Cp8ieijh0Fdk",
    "userInfo": {
        "username": "bootcampuser",
        "email": "bootcamp@gmail.com"
    }
}
```

### Singin User

#### Request

- Endpoint: `POST: /user/signin`
- Requires: `Authentication`

#### Response

- Status: `200: OK`
- Body `(application/json)`
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInVzZXJuYW1lIjoiYm9vdGNhbXB1c2VyIiwiZW1haWwiOiJib290Y2FtcEBnbWFpbC5jb20iLCJpYXQiOjE0OTk5NDgyMDEsImV4cCI6MTUwMDAzNDYwMX0.pPDBamQ9Bu1YQmrFuU5SX39jMC2Urx4Cp8ieijh0Fdk",
    "userInfo": {
        "username": "bootcampuser",
        "email": "bootcamp@gmail.com"
    }
}
```
### Group

#### Request

- Endpoint: `POST: /group`
- Requires: `Authentication`
- Body
```json
{
 "groupname": happy12,
}
```
#### Response

- Status: `200: OK`
- Body (application/json)
```json
{
    "id": 5,
    "groupname": "happy12",
    "updatedAt": "2017-07-13T16:09:10.679Z",
    "createdAt": "2017-07-13T16:09:10.679Z"
}
```
### Add user to Group

#### Request

- Endpoint: `POST: api/group/1/user`
- Requires: `Authentication`
- Body `(application/json)`

#### Response

- Status: `200: OK`
- Body `(application/json)`
```json
{
    "groupId": 1,
    "userId": 1,
    "updatedAt": "2017-07-13T16:11:37.427Z",
    "createdAt": "2017-07-13T16:11:37.427Z",
    "id": 3
}
```
### Post Message to Group

#### Request

- Endpoint: `POST: api/group/:groupid/message`
- Requires: `Authentication`

#### Response

- Status: `200: OK`
- Body `(application/json)`
```json
{
    "id": 2,
    "userId": 8,
    "groupId": 3,
    "message": "Hi enjoyment team.",
    "messagePriority": "normal",
    "updatedAt": "2017-07-13T13:59:14.420Z",
    "createdAt": "2017-07-13T13:59:14.420Z"
}
```
### Retrieve Message for Group

#### Request

- Endpoint: `GET: api/group/:groupid/messages`
- Requires: `Authentication`

#### Response

- Status: `200: OK`
- Body `(application/json)`
```json
[
    {
        "id": 2,
        "groupId": 3,
        "userId": 8,
        "message": "Hi enjoyment team.",
        "messagePriority": "normal",
        "createdAt": "2017-07-13T13:59:14.420Z",
        "updatedAt": "2017-07-13T13:59:14.420Z"
    }
]
```


### Technologies Used

- JavaScript (ES6)
- Node.js
- Express
- Postgresql
- Sequelize ORM
- Bootstrap CSS


### Prerequisites includes

- Postgresql and
- Node.js >= v6.8.0.

### Procedure

- Clone this repository from a terminal `https://github.com/bumsyalao/PostIt-Bootcamp-Project.git`
- Move into the project directory cd dms
- Install project dependencies npm install
- Create Postgresql database and run migrations npm undo and npm redo.
- Start the express server npm start.
- Run test npm test.
- Make changes and commit your changes
- git push and make a pull request to my repo

### How to Contribute

- Fork or clone the repo to your computer.
- Run npm install
- Create a feature branch and work on it.
- Push to the remote branch.
- Open a Pull Request to master branch.
