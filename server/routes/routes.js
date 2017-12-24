const mailController = require('../controller/mail.controller');
const smsController = require('../controller/sms.controller');

module.exports = (app) => {

    app.post('/mails', mailController.fetchUserMail);

    app.post('/mail/body/:id', mailController.fetchMailBody);

    app.get('/mails/:key', mailController.getUserMailsByKeyword);

    app.post('/sms', smsController.sendSMSToUser);
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
