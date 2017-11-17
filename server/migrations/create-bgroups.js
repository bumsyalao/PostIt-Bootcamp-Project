module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Groups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    groupName: {
      allowNull: false,
      primaryKey: false,
      type: Sequelize.STRING,
      unique: true,
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
  queryInterface.dropTable('Groups'),
};

