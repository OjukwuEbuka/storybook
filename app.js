const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');

// load config
dotenv.config({path: './config/config.env'});

connectDB();

const app = express()

// logging with morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars config
app.engine('.hbs', exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)