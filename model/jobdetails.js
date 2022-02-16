
module.exports = (sequelize, Sequelize)=>{

    //job detail model

const User =sequelize.define('user',
{
   profile:{
     type:Sequelize.DataTypes.STRING,
     allowNull:false,

 },
   location:{
    type:Sequelize.DataTypes.STRING,
     allowNull:false,
 },
   jobtype:{
    type:Sequelize.DataTypes.STRING,
     allowNull:false,
 },
   about:{
    type:Sequelize.DataTypes.STRING(1234),
    allowNull:false,
 }
});
return User;
}