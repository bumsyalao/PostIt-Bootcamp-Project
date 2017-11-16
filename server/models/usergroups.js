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
    groupName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
    {
      classMethods: {
        associate: (models) => {
          Usergroups.belongsTo(models.Groups, { foreignKey: 'groupId' });
          Usergroups.belongsTo(models.Users, { foreignKey: 'userId' });
        }
      }
    }
  );

  return Usergroups;
};
