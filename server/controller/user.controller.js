const google = require('googleapis');
const googleAuth = require('google-auth-library');
const moment = require('moment');

const Thread = require('../models/thread');
const authConfig = require('../config/auth');
const gmail = google.gmail('v1');

const DAY_COUNT = 30;

const getAccessToken = (code) => {
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(
        authConfig.googleAuth.clientID, 
        authConfig.googleAuth.clientSecret, 
        authConfig.googleAuth.callbackURL
    );

    return new Promise( (resolve, reject) => {
        oauth2Client.getToken( code, (err, tokens) => {
            if(err) {
                console.log(err);
                reject(err);
            }
            //console.log(tokens);
            oauth2Client.credentials = tokens;
            resolve(oauth2Client);
        });
    });

};

 const fetchUserMail = (req, res, next) => {
    
    getAccessToken(req.body.code)
        .then( auth => {
            gmail.users.threads.list({
                auth: auth,
                userId: 'me',
                q: '-label:chats before:'+getDateByDays(DAY_COUNT)
              }, function(err, response) {
                if (err) {
                  console.log('The API returned an error: ' + err);
                  return;
                }
                //console.log(response);
                fetchUserThreads(response.threads, auth);
                res.send(response);
              });
        }).catch( err => { console.error(err); } );

    };

    const fetchUserThreads = (threads, auth) => {
        try {
            threads.forEach( thread => {
                new Promise( (resolve, reject) => {
                    gmail.users.threads.get({
                        auth: auth,
                        userId: 'me',
                        id: thread.id                    
                    }, saveUserThreadsToDb);
                });
            });
        } catch (err) { 
            console.error(err); 
        }
        return;
    };

    const saveUserThreadsToDb = (err, msg) => {
        if(err) console.error(err);
       try {
        const thread = new Thread( {
            id: msg.id,
            historyId: msg.historyId,
            message: [ msg.messages ]
        });
        thread.save( (err, res) => {
            if(err) console.log(err);
          //  console.log('Thread Saved. '+ res);
        });
       } catch (error) {
            console.error(error);
       }
        
    };

    const getDateByDays = (dayCount) => {
        return moment().subtract(dayCount, 'days').format('YYYY/MM/DD');
    };

module.exports = {
    fetchUserMail : fetchUserMail
}