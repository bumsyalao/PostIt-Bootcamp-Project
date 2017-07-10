module.exports = (sequelize, DataTypes) => {
  const messages = sequelize.define('messages', {
    messageId: {
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
          foreignKey: 'groupId',
          as: 'messages',
        });
      },
    },
  });




  return messages;
};