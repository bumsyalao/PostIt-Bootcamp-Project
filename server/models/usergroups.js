module.exports = (sequelize, DataTypes) => {
  const Usergroups = sequelize.define('Usergroups', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    userGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true,

    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        },
      },
      unique: {
        msg: 'Group name must be unique'
      },

    }
  }, {
    classMethods: {
      associate: (models) => {
        Usergroups.hasMany(models.Users, {
          foreignKey: {
            name: 'userGroupId',
            onDelete: 'CASCADE'
          }
        });
        Usergroups.hasMany(models.Groups, {
          foreignKey: {
            name: 'groupId',
            onDelete: 'CASCADE'
          }
        });
      },
    },
  });

  return Usergroups;
};
