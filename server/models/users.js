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
    phonenumber: {
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
    forgotpasswordtoken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expirytime: {
      type: DataTypes.STRING,
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
        const { password, updatedAt, ...rest } = this.get();
        return rest;
      }
    }
  });
  return Users;
};
