module.exports = {
  up: (queryInterface, Sequelize) =>
  queryInterface.createTable('Todos', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: (queryInterface /*, sequelize */) => queryInterface.dropTable('Todos'),
};