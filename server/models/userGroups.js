module.exports = (sequelize, DataTypes) => {
  const UserGroups = sequelize.define('UserGroups', {
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
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: (models) => {
          UserGroups.belongsTo(models.Groups, { foreignKey: 'groupId' });
          UserGroups.belongsTo(models.Users, { foreignKey: 'userId' });
        }
      }
    }
  );

  return UserGroups;
};
