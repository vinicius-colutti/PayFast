const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
module.exports = () =>{
  const app = express();
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(expressValidator());
  consign()
  .include('controllers')
  .then('DAO')
  .then('servicos')
  .into(app);

  return app;
}
