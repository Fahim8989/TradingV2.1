// Import the modules we need
var express = require ('express')
const session = require('express-session');
var bodyParser= require ('body-parser')
const cors = require("cors");
const dotenv =require('dotenv');
dotenv.config();
const path =require('path')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const axios = require('axios');

// Create the express application object
const mysql = require('mysql');
const db = require('./configs/db');
const app = express()

// const authController = require('./controllers/authController');

const  PORT= process.env.PORT || 3301
const JWT_SECRET=process.env.JWT_SECRET_KEY


app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({ secret: JWT_SECRET, resave: true, saveUninitialized: true }));

// Connect to DB 
db;

// const authenticateToken = require('./middlewares/authMiddleware');
// app.use(authenticateToken);

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');
const searchRoutes = require('./routes/searchRoutes');
const addCustomCoinRoutes = require('./routes/addCustomCoinRoutes');
const weeklyRoutes = require('./routes/weeklyRoutes');
const chartRoutes = require('./routes/chartRoutes');
const addAlertRoutes = require('./routes/addAlertRoutes');
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/favorites', favoriteRoutes);
app.use('/search', searchRoutes);
app.use('/addcustomcoin', addCustomCoinRoutes);
app.use('/weeklyprices', weeklyRoutes);
app.use('/chart', chartRoutes);
app.use('/addalert', addAlertRoutes);
// Set up css


app.use(express.static(__dirname + '/public'));

// Set the directory where Express will pick up HTML files
// __dirname will get the current directory



// Set the views folder as the root for res.sendFile
const viewsPath = path.join(__dirname, 'views');



app.set('view engine', 'html');


require("./routes/main")(app);


// Start the web app listening
app.listen(PORT, () => console.log(`App listening on port ${PORT}!`))
//ssh -t mahme006@doc.gold.ac.uk myserver ssh 443

