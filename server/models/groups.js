module.exports = (sequelize, DataTypes) => {
  const groups = sequelize.define('groups', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    groupname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, 

  {
    classMethods: {
      associate: (models) => {
        groups.hasMany (models.users, {
          primarykey: 'groupId',
          as: 'groups',
        });
      },
    },
  });




  return groups;
};