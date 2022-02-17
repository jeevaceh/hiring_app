
module.exports = (sequelize, Sequelize) => {

    //candidate detail model
  
    const Candidate = sequelize.define('candidate',
      {
        can_name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
  
        },
        can_location: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        can_jobtype: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
        },
        can_about: {
          type: Sequelize.DataTypes.STRING(1234),
          allowNull: false,
        }
      });
    return Candidate;
  }