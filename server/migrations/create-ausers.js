module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Users', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,

    },
    email: {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true,
    },
    phoneNumber: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    forgotPasswordToken: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    expiryTime: {
      allowNull: true,
      type: Sequelize.DATE,
    },
    hash: {
      allowNull: true,
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },

  }),


  down: queryInterface =>
  queryInterface.dropTable('Users')
};

