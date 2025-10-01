const dotenv = require('dotenv');

dotenv.config();
require('./config/databse.js');
const express = require('express');

const app = express();

const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const requireRole = require('./middleware/require-role.js');

// Controllers
const authController = require('./controllers/auth.js');
const eventsController = require('./controllers/events.js');
const playersController = require('./controllers/players.js');
const usersController = require('./controllers/users.js');

// Set the port from environment variable or default to 3000
const PORT = process.env.PORT ? process.env.PORT : '3000';

// MIDDLEWARE
//
// Set EJS as the view engine
app.set('view engine', 'ejs');
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride('_method'));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// Session Storage with MongoStore
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

// Add user variable to all templates
app.use(passUserToView);

// PUBLIC
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.use('/auth', authController);
app.use('/events', eventsController);
app.use('/players', playersController);
app.use('/users', usersController);

// PROTECTED ROUTES

// Admin-only routes for event management
app.get('/admin/events', isSignedIn, requireRole('admin'), (req, res) => {
  res.redirect('/events');
});

app.get('/admin/events/new', isSignedIn, requireRole('admin'), (req, res) => {
  res.redirect('/events/new');
});

app.listen(PORT, () => {
  console.log(`The express app is ready on port ${PORT}!`);
});