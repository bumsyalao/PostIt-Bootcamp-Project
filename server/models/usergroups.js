module.exports = (sequelize, DataTypes) => {
  const usergroups = sequelize.define('usergroups', {
    usergroupId: {
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