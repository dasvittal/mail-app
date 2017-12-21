const userController = require('../controller/user.controller');

module.exports = (app, passport) => {

    app.post('/getMails', userController.fetchUserMail);


    // app.get('/auth/google', 
    //     passport.authenticate('google', { scope : ['profile', 'email']})
    // );

    // app.get('auth/google/callback', passport.authenticate('google', {successRedirect : '/emails',failureRedirect : '/'})   
    // );

    // function isLoggedIn (req, res, next) {
    //     if(req.isAuthenticate()) return next();

    //     res.redirect('/');
    // }

};