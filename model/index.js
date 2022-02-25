const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
//import from config
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./jobdetails")(sequelize, Sequelize);
db.Candidate = require("./candidate")(sequelize, Sequelize);
db.regist=require("./register")(sequelize,Sequelize);
db.token = require('./token')(sequelize,Sequelize);
module.exports = db; //exporting db