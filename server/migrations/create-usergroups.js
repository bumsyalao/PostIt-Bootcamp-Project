module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('usergroups', {

    userId: {
      allowNull: false,
      autoIncrement: true,
      foreignKey: true,
      type: Sequelize.INTEGER,
    },

    groupId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    usergroupId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
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
  

  down: (queryInterface) =>
  queryInterface.dropTable('usergroups')
};

