import { Router } from 'express';
import jwt = require('jsonwebtoken');
import passport = require('passport');

const router = Router();

router.post('/api/login',
  (req, res, next) => {
    passport.authenticate('local', { session: false },
      (err, user, info) => {
        if (err || !user) {
          return res.status(400).json({
            message: info.message ? info.message : 'Something is not right',
            error: err,
            user,
          });
        }
        req.login(user, { session: false }, (loginError) => {
          if (loginError) {
            res.send(loginError);
          }
          // generate a signed son web token with the contents of user object and return it in the response
          const token = jwt.sign(user, 'jwt_secret');
          return res.json({ user, token });
        });
      })(req, res);
  });

router.get('/api/auth',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.send(req.user);
  });

module.exports = router;
