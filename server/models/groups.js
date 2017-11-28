module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    groupName: {
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
      hooks: {
        beforeCreate(group) {
          group.groupName = group.groupName.toLowerCase();
        },
        beforeUpdate(group) {
          group.groupName = group.groupName.toLowerCase();
        }
      },
      classMethods: {
        associate: (models) => {
          Groups.belongsToMany(models.Users, { through: 'Usergroups',
            foreignKey: 'groupId',
            onDelete: 'CASCADE' });
          Groups.hasMany(models.Messages, {
            foreignKey: 'groupId',
            onDelete: 'CASCADE'
          });
        },
      },
    });
  return Groups;
};
