module.exports = (sequelize, Sequelize) => {

    //user register model
  
    const regist = sequelize.define('register',

      {
          
        name : {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
  
        },
        email: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        }
      });
    return regist;
  }