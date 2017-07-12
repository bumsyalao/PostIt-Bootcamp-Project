module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Usergroups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },

    userGroupId: {
      allowNull: true,
      foreignKey: true,
      type: Sequelize.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },

    groupname: {
      allowNull: true,
      type: Sequelize.STRING,
    },

    groupId: {
      allowNull: true,
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

