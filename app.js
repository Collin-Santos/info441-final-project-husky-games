import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import wsRouter from './routes/websockets.js';
import leaderboardRouter from './routes/leaderboard.js';
import sessions from 'express-session'; 
import MsIdExpress from 'microsoft-identity-express';
import { createRequire } from 'module';

import db from './database/database.js'

//const require = createRequire(import.meta.url);
// Swap for azure deploy
//const appSettings = require('./credentials.json');
const appSettings = {
  appCredentials: {
    tenantId: process.env.AZURE_TENANT_ID,
    clientId: process.env.AZURE_CLIENT_ID,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  },

  authRoutes: {
    redirect: "https://huskygamecenter.azurewebsites.net/redirect",
    error: "/error",
    unauthorized: "/unauthorized"
  }
}

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), {extensions:['html']}));
app.use((req, res, next) => {
  req.db = db
  next()
})

const oneDay = 1000 * 60 * 60 * 24;
const secret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 25);
app.use(sessions({
    secret: secret,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));

app.use('/', indexRouter);
app.use('/websockets', wsRouter);
app.use('/users', usersRouter);
app.use('/leaderboard', leaderboardRouter);

const msid = new MsIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.get('/signin',
  msid.signIn({
    postLoginRedirect: '/users/add',
  }
));

app.get('/signout', 
    msid.signOut({
        postLogoutRedirect: '/'
    }
));

app.get('/error', (req, res) => res.status(500).send('server error'));
app.get('/unauthorized', (req, res) => res.status(401).send('