import { Router } from 'express';
const router = Router();
import isLoggedIn from '../middlewares/isLoggedIn.js';

//
import session from 'express-session';

router.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));
//

//
import passport from 'passport';
var userProfile;

router.use(passport.initialize());
router.use(passport.session());

router.get('/success', isLoggedIn, (req, res) => {
  // TODO: render success login page

  res.send(userProfile);
});

router.get('/error', (req, res) => {
  // TODO: render error login page

  res.send('error logging in');
});

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
//

//
import GoogleStrategy from 'passport-google-oauth';
const GOOGLE_CLIENT_ID = '384846276379-ih4ucc8boll6b829up2vcrsiaolvirc2.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy.OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/google/callback'
}, function(accessToken, refreshToken, profile, done) {
  userProfile = profile;

  // TODO: database action (save user?)

  return done(null, userProfile);
}));

router.get('/google', passport.authenticate('google', {
  scope : ['profile', 'email']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/error' }),
  (req, res) => res.redirect('/api/auth/success'));
//

export default router;