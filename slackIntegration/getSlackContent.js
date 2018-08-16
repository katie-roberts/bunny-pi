var request = require('request');

var url = 'https://slack.com/api/channels.history';
var env = require('node-env-file');
env(__dirname + '/../.env');
var token = process.env.TOKEN;
var channelId = 'CBFDDKKF0';


module.exports = {
  getMoodyContent: function (callback, secondCallback) {
    var constructedUrl = url + '?token=' + token + '&channel=' + channelId;

    request(constructedUrl, function (error, response, body) {
      //Check for error
      if (error) {
        return console.log('Error:', error);
      }

      //Check for right status code
      if (response.statusCode !== 200) {
        return console.log('Invalid Status Code Returned:', response.statusCode);
      }


      var slackResponse = JSON.parse(body);
      callback(slackResponse.messages, secondCallback);
    });
  }
};
