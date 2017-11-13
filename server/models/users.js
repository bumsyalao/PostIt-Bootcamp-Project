const bcrypt = require('bcrypt');

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
      unique: {
        args: true,
        msg: 'email already in use'
      },
      validate: {
        isEmail: {
          args: true,
          msg: 'Please enter a valid email'
        },
        notEmpty: {
          msg: 'field must not be empty'
        }
      },
    },
    phoneNumber: {
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
    forgotPasswordToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiryTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    hash: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: true
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
        Users.belongsToMany(models.Groups, { through: 'Usergroups', foreignKey: 'userId' });
        Users.hasMany(models.Messages, { foreignKey: 'userId' });
      },
    },
    instanceMethods: {
      verifyPassword(userPassword) {
        return bcrypt.compareSync(userPassword, this.password);
      },
      filterUserDetails() {
        const details = this.get();
        delete details.password;
        delete details.updatedAt;

        return details;
      }
    }
  });
  return Users;
};
