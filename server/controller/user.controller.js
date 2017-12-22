const google = require('googleapis');
const googleAuth = require('google-auth-library');
const moment = require('moment');

const Thread = require('../models/thread');
const UserToken = require('../models/userToken');
const authConfig = require('../config/auth');
const gmail = google.gmail('v1');

const DAY_COUNT = 30;

const getAccessToken = (code) => {
    const oauth2Client = getAuthClient();
    return new Promise((resolve, reject) => {
        if(code) {
          UserToken.find({ 'code' : code} , (err, token) => {
            if(err) console.log(err);
            if(!token || !token.length ) {
              oauth2Client.getToken(code, (err, tokens) => {
                if (err) reject(err);

                oauth2Client.credentials = tokens;
                setTimeout(() => { saveUserToken(code, tokens); }, 0);
                resolve(oauth2Client);
              });
            } else  {
              oauth2Client.credentials = token[0].tokens;
              resolve(oauth2Client);
            }
        });
        } else {reject({err: 'code is empty !'});}
      });
};

const saveUserToken = (code,token) => {
    const ut = {
      code : code,
      tokens : token
    };
    const newUserToken = new UserToken(ut);
    try {
      UserToken.findOne({ 'code' : code}, (err, token) => {
        if(err) console.log(err);
        if(!token) {
          newUserToken.save( (err, res) => {
            if(err) console.log(err);
          });
        }
        return;
      }); 
    } catch(error) {
        console.log(error);
    }
};

const fetchUserMail = (req, res, next) => {
   try {
      getAccessToken(req.body.code)
        .then( auth => {
          gmail.users.threads.list({
            auth: auth,
            userId: 'me',
            labelIds: ['INBOX', 'IMPORTANT'],
            q: '-label:chats before:' + getDateByDays(DAY_COUNT)
          }, function (err, response) {
            if (err) {
              console.log('The GAPI error: ' + err);
              return;
            }
            if(response.threads) fetchUserThreads(response.threads, auth);
            res.send(response);
          });
        });
   } catch (error) {
     console.log(error);
   }
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

const getAuthClient = () => {
  const auth = new googleAuth();
  const oauth2Client = new auth.OAuth2(
    authConfig.googleAuth.clientID,
    authConfig.googleAuth.clientSecret,
    authConfig.googleAuth.callbackURL
  );
  return oauth2Client;
}

const fetchMailBody = (req, res, next) => {
  try {
    getAccessToken(req.body.code) 
      .then( auth => {
        gmail.users.messages.get({
          auth: auth,
          userId: 'me',
          id: req.params.id
        }, function (err, response) {
          if (err) {
            console.log('The GAPI error: ' + err);
            return;
          }
          res.send(response);
        });
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchUserMail: fetchUserMail,
  fetchMailBody: fetchMailBody
};
