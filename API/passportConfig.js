const User = require("./models/user");
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        });
      });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: '660766853123-10tfek3hfs64f0t7tpvqmg0l0olhg17v.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: "https://http://localhost:3000/auth/google/callback",
        passReqToCallback   : true
      },
      function (token, tokenSecret, profile, done) {
        return done(null, profile);
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      const userInformation = {
        id: user._id,
        username: user.username,
        events: user.events,
        profile: user.profile,
        city: user.city,
        subscriptions: user.subscriptions,
      };
      cb(err, userInformation);
    });
  });
};
