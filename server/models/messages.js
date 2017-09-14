module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
    messagePriority: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },

    {
      classMethods: {
        associate: (models) => {
          Messages.belongsTo(models.Users, {
            foreignKey: 'userId',
          });
          Messages.belongsTo(models.Groups, {
            foreignKey: 'groupId',
            onDelete: 'CASCADE'
          });
        },
      },
    });


  return Messages;
};
