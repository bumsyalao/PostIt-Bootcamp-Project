# PostIt-Bootcamp-Project

A cool App that allows users create groups and post notifications to group.

It provides restful APIs for users to create groups, post messages and retrieve messages based on userId and managing authentication of users with JsonWebToken.

[![Build Status](https://travis-ci.org/bumsyalao/PostIt-Bootcamp-Project.svg?branch=master)](https://travis-ci.org/bumsyalao/PostIt-Bootcamp-Project) [![Coverage Status](https://coveralls.io/repos/github/bumsyalao/PostIt-Bootcamp-Project/badge.svg?branch=master)](https://coveralls.io/github/bumsyalao/PostIt-Bootcamp-Project?branch=master) [![Code Climate](https://codeclimate.com/github/bumsyalao/PostIt-Bootcamp-Project/badges/gpa.svg)](https://codeclimate.com/github/bumsyalao/PostIt-Bootcamp-Project)

##### Hosted App on Heroku 
[Post-it](https://postit-now.herokuapp.com/)

[Api Documentation](https://app.apiary.io/postit13/)

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

### Contributing

PostIt welcomes contributions in form of pull requests, as main purpose of open sourcing is to make it better and easier to use.

#### Reporting Bugs

If you find bugs in the application, create a New Issue with additional data, like your node/npm version or snippet of code and let me know about it.

#### Contact

If you need clarification on what is not clear, contact me via mail olubunmi.alao@andela.com

Pull requests

Fork the repository and create a branch from develop.
If you have added or changed existing code, add unit tests!
Ensure that all unit tests passes.
Check that your code lints (Eslint)

#### Style guide [airbnb](https://github.com/airbnb/javascript)

- Use es6 syntax only
- Use semicolons
- 2 space indention (no tabs)
- Prefer single quote over double quote
- Prefer template strings
- 120 character length limit
- Do not use console.log, etc in code (expect debugging locally)
- Always add exact versions of packages 3.2.0 instead of ^3.2.0

##### Branch Naming Convention

A sample of the branch naming convention is found on the Branch Naming wiki page

##### Commit Message Convention

A sample of the commit message convention is found on the Commit Message wiki page

##### Pull Request Naming and Description Convention

A sample of the pull request naming and description convention on the Pull Request Naming and Description wiki page

### Author
Olubunmi Alao
#### Licence

ISC

Copyright (c) 2017 Bunmi Alao
