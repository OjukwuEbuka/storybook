const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');
const passport = require('passport');
const path = require('path');
const session = require('express-session');

// load config
dotenv.config({path: './config/config.env'});

// passport config
require('./config/passport')(passport)

connectDB();

const app = express()

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

const PORT = process.env.PORT || 3000

app.listen(
    PORT,
    console.log(`Sever running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)