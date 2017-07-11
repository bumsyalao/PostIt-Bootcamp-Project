import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'username already in use'
      },
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
  }, {
    hooks: {
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);
      },
      beforeUpdate(user) {
        if (user.password) {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
          user.updateAt = Date.now();
        }
      }
    },

    classMethods: {
      associate: (models) => {
        Users.belongsTo(models.usergroups, {
          foreignKey: {
            name: 'groupId',
            onDelete: 'CASCADE'
          }
        });
      },

    },

    instanceMethods: {
      isPassword(password) {
        return bcrypt.compareSync(password, this.password);
      }
    }
  });
  return Users;
};
