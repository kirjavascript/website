var Mail = require("lazysmtp").Mail;
var mail = new Mail("example.com", false);
mail.start();
 
mail.on("mail", function(email) {
 
    //Pass it on to a parser. Or don't. I don't care. 
    console.log(email);
 
});
 
mail.on("connectionIncoming", function(client) {
    console.log("Connection from: " + client.address + " on port " + client.port);
}):