import bcrypt from 'bcrypt';

const hash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      fullname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('NOW'),
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    },
  );

  User.beforeCreate((userInfo) => {
    const user = userInfo;
    const hashedPass = hash(user.dataValues.password);
    user.password = hashedPass;
  });

  User.associate = ({ Record }) => {
    User.hasMany(Record, {
      foreignKey: 'id',
    });
  };

  return User;
};
