module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Groups', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    groupname: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: Sequelize.STRING,
      unique: true,
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
  queryInterface.dropTable('Groups'),
};

