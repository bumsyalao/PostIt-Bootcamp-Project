module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Messages', {

    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    message: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    groupId: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references : {
        model: 'Groups',
        key: 'id'
      }
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references : {
        model: 'Users',
        key: 'id'
      }
    },

    messageStatus: {
      allowNull: false,
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
  queryInterface.dropTable('Messages'),
};
