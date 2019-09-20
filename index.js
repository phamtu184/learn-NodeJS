const express = require('express');
const app = express();
const port = 3000;
const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');

const productsRoutes = require('./routes/products.route.js');

var cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asdsadsa123'));

app.get('/', function(req, res){
  res.render('index.pug')
});

app.use(express.static(__dirname + '/public'));

app.use('/users', userRoutes);
app.use('/auth', authRoutes);

app.use('/products', productsRoutes);

app.listen(port, function(){
  console.log('example app listening');
});