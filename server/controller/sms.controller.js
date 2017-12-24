var plivo = require('plivo');

var plivoClient = plivo.RestAPI({
  authId: 'AUTH_ID',
  authToken: 'Auth_TOKEN'
});

sendSMSToUser = (req, res, next) => {
  var params = {
    'src': '1111111111',
    'dst' : '+917978060295',
    'text' : req.body.msg
  };
  plivoClient.send_message(params, function (status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
      res.send(response);
    });
};

module.exports = {
  sendSMSToUser : sendSMSToUser
};
