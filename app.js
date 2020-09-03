const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session)

// load config
dotenv.config({path: './config/config.env'});

// passport config
require('./config/passport')(passport)

connectDB();

const app = express()

// Body parser
app.use(express.urlencoded({extended: false}))
app.use(express.json())

// logging with morgan
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// Handlebars config
app.engine('.hbs', exphbs({defaultLayout:'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
    secret: "avenderaldora",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
    // cookie: {secure: true}
}))

// passport middleware
app.use(passport.initialize())
app.use(passport.session())


// Static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)