module.exports = (sequelize, DataTypes) => {
  const Usergroups = sequelize.define('Usergroups', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Usergroups;
};
