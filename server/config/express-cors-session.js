const cors = require('cors');
const session = require('express-session');

const isProduction = process.env.NODE_ENV === 'production';

const FRONTEND_URL = isProduction
  ? 'https://apadicto-2-frontend.vercel.app'
  : 'http://localhost:3000';

const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true
};

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'superSecretKey',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax'
  }
};

module.exports = function(app) {
  app.use(cors(corsOptions));
  app.use(session(sessionOptions));
};