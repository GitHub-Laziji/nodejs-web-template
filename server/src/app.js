const express = require('express');
const ejs = require('ejs');
const { User } = require("../db.js");

const app = express();
app.set('views', './view/');
app.engine('html', ejs.__express);
app.set('view engine', 'html');

app.get('/', async function (request, response) {
  response.render('index', {
    message: "hello"
  });

});
app.listen(12306);
console.log('http://127.0.0.1:12306');