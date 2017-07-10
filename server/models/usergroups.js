module.exports = (sequelize, DataTypes) => {
  const Usergroups = sequelize.define('Usergroups', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return usergroups;
};