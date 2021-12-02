import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import wsRouter from './routes/websockets.js';
import sessions from 'express-session'; 
import MsIdExpress from 'microsoft-identity-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const appSettings = require('./credentials.json');

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/websockets', wsRouter);
app.use('/users', usersRouter);

const oneDay = 1000 * 60 * 60 * 24;
const secret = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 25);
app.use(sessions({
    secret: secret,
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));

const msid = new MsIdExpress.WebAppAuthClientBuilder(appSettings).build();
app.use(msid.initialize());

app.get('/signin',
  msid.signIn({
    postLoginRedirect: '/'
  }
));

app.get('/signout', 
    msid.signOut({
        postLogoutRedirect: '/'
    }
));

app.get('/error', (req, res) => res.status(500).send('server error'));
app.get('/unauthorized', (req, res) => res.status(401).send('Permission denied'));


export default app;