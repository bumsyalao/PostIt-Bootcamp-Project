module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    messages: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
    messageStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  
  }, 

  {
    classMethods: {
      associate: (models) => {
        groups.hasMany (models.messages, {
          foreignKey: 'groupId', 'userId',
        });
      },
    },
  });




  return messages;
};