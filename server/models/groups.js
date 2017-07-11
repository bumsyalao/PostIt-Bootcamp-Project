module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
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
  },
    {
      classMethods: {
        associate: (models) => {
          Groups.hasMany(models.Users, {
            foreignKey: {
              name: 'userId',
              onDelete: 'CASCADE'
            }
          });
        },
      },
    });
  return Groups;
};
