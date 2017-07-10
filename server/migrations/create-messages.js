module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('messages', {

    messageId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    message: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: Sequelize.STRING,
    },
    groupId: {
      allowNull: false,
      autoIncrement: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
    },
    messageStatus: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: Sequelize.BOOLEAN,
    },

    complete: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
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
 

  down: (queryInterface /* , Sequelize */) =>
  queryInterface.dropTable('messages'),
};

