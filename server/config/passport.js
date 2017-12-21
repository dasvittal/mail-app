const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const authConfig = require('./auth');
const User = require('../models/user');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user);
    });
    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    passport.use('googleToken',new GoogleStrategy(authConfig.googleAuth,
        (token, refreshToken, profile, done) => {
            process.nextTick( () => {
                User.findOne( { 'google.id' : profile.id}, (err, user) => {
                    if(err) return done(err);
                    if(user) return done(null, user);
                    
                    let newUser = new User();
                    newUser.id = profile.id;
                    newUser.token = profile.token;
                    newUser.name = profile.name;
                    newUser.email = profile.email;

                    newUser.save( (err) => {
                        if(err) throw err;
                        return done(null, newUser); 
                    });

                });
            });

        }));
};