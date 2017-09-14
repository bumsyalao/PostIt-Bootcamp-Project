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
