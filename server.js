const express = require('express');
const app = express();
app.use(express.json())
const user = require("./model");
user.sequelize.sync();

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
  next();
});

app.use('/api', require('./routes/index'));
app.use('/pdf', express.static('./pdf'))


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log('The web server has started on port 8080');
});
