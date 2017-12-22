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
    return new Promise((resolve, reject) => {
        if(code) {
          oauth2Client.getToken(code, (err, tokens) => {
            if (err) {
              console.log(err);
              reject(err);
            }
            oauth2Client.credentials = tokens;
            resolve(oauth2Client);
          });
        } else {reject({err: 'code is empty !'});}
      });

};

const fetchUserMail = (req, res, next) => {
  getAccessToken(req.body.code)
    .then(auth => {
      gmail.users.threads.list({
        auth: auth,
        userId: 'me',
        q: '-label:chats before:' + getDateByDays(DAY_COUNT)
      }, function (err, response) {
        if (err) {
          console.log('The GAPI error: ' + err);
          return;
        }
        if(response.threads) fetchUserThreads(response.threads, auth);
        res.send(response);
      });
    }).catch(err => {
      console.error(err);
    });
};

const fetchUserThreads = (threads, auth) => {
  try {
    threads.forEach(thread => {
      setTimeout(() => {
        new Promise((resolve, reject) => {
          gmail.users.threads.get({
            auth: auth,
            userId: 'me',
            id: thread.id
          }, saveUserThreadsToDb);
        });
      }, 200);
    });
  } catch (err) {
    console.error(err);
  }
  return;
};

const saveUserThreadsToDb = (err, msg) => {
  if (err) console.error(err);
  try {
    if (msg) {
      const thread = new Thread(msg);
      thread.save((err, res) => {
        if (err) console.log(err);
        //console.log('Thread Saved. ' + res);
      });
    }
  } catch (error) {
    console.error(error);
  }
};

const getDateByDays = (dayCount) => {
  return moment().subtract(dayCount, 'days').format('YYYY/MM/DD');
};

const fetchMailBody = (req, res, next) => {
  try {
    console.log(req.query);
    getAccessToken(req.body.code).then( auth => {
        gmail.users.threads.get({
            auth: auth,
            userId: 'me',
          }, function (err, response) {
            if (err) {
              console.log('The GAPI error: ' + err);
              return;
            }
            res.send(response);
        });
    }) ;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchUserMail: fetchUserMail,
  fetchMailBody: fetchMailBody
};
