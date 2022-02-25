module.exports = (sequelize, Sequelize) => {

  
  
    const token = sequelize.define('reset_token',

      {
          
        id: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
          primaryKey: true,
          validate: {
            notEmpty: true
        }
          
  
        },
        token: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        
      });
    return token;
  }