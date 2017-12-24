var plivo = require('plivo');

var p = plivo.RestAPI({
  authId: 'MANGJHMDAXYMY2YZE5ZJ',
  authToken: 'Y2NiZjk1YWIzM2M2OTEwYjIzZjYyYzJmNzczZjRi'
});

sendSMSToUser = (req, res, next) => {
  var params = {
    'src': '1111111111',
    'dst' : '+917978060295',
    'text' : req.body.msg
    //'url' : "http://example.com/report/",
    //'method' : "GET"
  };
    p.send_message(params, function (status, response) {
      console.log('Status: ', status);
      console.log('API Response:\n', response);
      res.send(response);
    });
};

module.exports = {
  sendSMSToUser : sendSMSToUser
};
