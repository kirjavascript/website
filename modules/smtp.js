var Server = require('smtpd-lite');
 
var server = new Server({
  host: 'mail.example.com',
  domain: 'example.com'
});
 
server.on('receive', function(mail) {
  console.log(mail);
});
 
server.listen(25);