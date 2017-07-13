export default {
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

