import bodyParser = require('body-parser');
import express = require('express');
import passport = require('passport');
import passportJWT = require('passport-jwt');
import { Strategy as LocalStrategy } from 'passport-local';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Passport configuration
const mockUser = {
  id: 1,
  email: 'testuser@yopmail.com',
  password: 'test'
};
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
  (email, password, next) => {
    if (email === mockUser.email && password === mockUser.password) {
      return next(null, mockUser, { message: 'Logged In Successfully' });
    } else {
      return next(null, false, { message: 'Incorrect email or password.' });
    }
  }
));

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'jwt_secret'
},
  (jwtPayload, next) => {
    if (jwtPayload.id === mockUser.id) {
      return next(null, mockUser);
    }
    return next(null);
  }
));

app.use('/', require('./modules/auth/auth.router'));

const port = process.env.PORT || '3000';
app.set('port', port);

app.listen(port, () => {
  console.log(`API running on port ${port}`);
});
