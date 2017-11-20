# PostIt-Bootcamp-Project

A cool App that allows users create groups and post notifications to group.

It provides restful APIs for users to create groups, post messages and retrieve messages based on userId and managing authentication of users with JsonWebToken.

[![Build Status](https://travis-ci.org/bumsyalao/PostIt-Bootcamp-Project.svg?branch=feedback-implementation)](https://travis-ci.org/bumsyalao/PostIt-Bootcamp-Project) [![Coverage Status](https://coveralls.io/repos/github/bumsyalao/PostIt-Bootcamp-Project/badge.svg?branch=master)](https://coveralls.io/github/bumsyalao/PostIt-Bootcamp-Project?branch=master) [![Code Climate](https://codeclimate.com/github/bumsyalao/PostIt-Bootcamp-Project/badges/gpa.svg)](https://codeclimate.com/github/bumsyalao/PostIt-Bootcamp-Project)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

##### Hosted App on Heroku 
[Post-it](https://postit-now.herokuapp.com/)

[Api Documentation](https://postit13.docs.apiary.io/)

### Key Application Features

A user can perform the following: 
- Create an account 
- Login to account 
- User can create groups of friends 
- User can join any group of choice. 
- Users can send messages to all their friends or to different groups they belong to.
- Users can search for other users in the app.
- Logout.

In addition to the general user functions:
- User can send email messages to memebers in groups.

##### Authentication: Users are authenticated and validated using JsonWebToken.

### Development

This application was developed using NodeJs with express for routing. Postgres was used for persisting data.

The frontend was built with the react and redux framework.

### Installation

- Clone the project repository.
- Run git clone (https://github.com/bumsyalao/PostIt-Bootcamp-Project)

``` git clone https://github.com/bumsyalao/PostIt-Bootcamp-Project ```

more info: (https://help.github.com/articles/cloning-a-repository/)
- Run ``` npm install ``` to install the dependencies in the package.json file.
- Create Postgresql database and run ```sequelize dbmigrate npm undo and npm redo ```(https://www.postgresql.org/)

#### Usage

Login, Sign Up and start creating groups

### Technologies Used

- JavaScript (ES6) (http://es6-features.org/)
- Node.js (https://nodejs.org/en/)
- Express (https://www.npmjs.com/package/express-api)
- React/Redux (http://redux.js.org/docs/basics/UsageWithReact.html)
- Sequelize ORM (http://docs.sequelizejs.com/)
- Material Design CSS Framework (http://materializecss.com/)
- SASS/SCSS.
- Postgres (https://www.postgresql.org/)

### Limitations
+ Users cannot upload their picture.
+ Users cannot add other users to group.
+ Users cannot leave a group.
+ Users cannot delete a message when sent
+ Users cannot delete other users.

### FAQ
#### Is PostIt app free or do you plan to monetize it in future?
Yes its totally free and it will continue to be free

#### How many end points are there currently?
Currently its 14

#### Is PostIt app open source?
Yes, and I encourage you to contribute to the project

#### What if I want to customize my environment variables?
That's easy. In the root of the project. create a file named .env and add exactly what you see in the .env.example file.


### Contribution
I am glad you want to contribute to this project, Please checkout the wiki page [Contributing](https://github.com/bumsyalao/PostIt-Bootcamp-Project/wiki/Contributing)

### Author
Olubunmi Alao
## License & Copyright
MIT © [Olubunmi Alao](https://github.com/bumsyalao)

Licensed under the [MIT License](LICENSE)
