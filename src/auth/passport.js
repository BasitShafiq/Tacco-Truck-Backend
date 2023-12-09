
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALL_BACK_URL,
},
  (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));

export { passport }; 