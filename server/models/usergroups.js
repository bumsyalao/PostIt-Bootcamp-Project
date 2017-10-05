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
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }
  );

  return Usergroups;
};
