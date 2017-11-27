module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Usergroups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    userId: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    groupId: {
      allowNull: false,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Groups',
        key: 'id'
      }
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING
    },

    groupname: {
      allowNull: false,
      type: Sequelize.STRING
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
  queryInterface.dropTable('Usergroups')
};

