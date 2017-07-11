module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
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
          Messages.belongsTo(models.Groups, {
            foreignKey: 'groupId',
          });
        },
      },
    });


  return Messages;
};
