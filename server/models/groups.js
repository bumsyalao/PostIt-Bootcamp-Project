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

    },
  },
    {
      classMethods: {
        associate: (models) => {
          Groups.belongsTo(models.Usergroups, {
            foreignKey: {
              name: 'groupId',
              onDelete: 'CASCADE'
            }
          });
          Groups.belongsTo(models.Messages, {
            foreignKey: {
              name: 'groupId',
              onDelete: 'CASCADE'
            }
          });
        },
      },
    });
  return Groups;
};
