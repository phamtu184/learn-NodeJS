const express = require('express');
const app = express();
const port = 3000;
var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/express-demo", { useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const userRoutes = require('./routes/user.route.js');
const authRoutes = require('./routes/auth.route.js');
const productsRoutes = require('./routes/products.route.js');
const cartRoutes = require('./routes/cart.route.js');

var sessionMiddleware = require('./middlewares/session.middleware');
var authMiddleware = require('./middlewares/auth.middleware');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asdsadsa123'));
app.use(sessionMiddleware);

app.get('/', function(req, res){
  res.render('index.pug')
});

app.use(express.static(__dirname + '/public'));

app.use('/users', authMiddleware.requireAuth, userRoutes);
app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/cart', cartRoutes);

app.listen(port, function(){
  console.log('example app listening');
});