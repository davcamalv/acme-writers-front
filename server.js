/**
* @author NSSPA-CLI
* @email manuelc.p.g@gmail.com
*/

const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3030;
const server = require('http').Server(app);

const access = "/index.html";

const dist_dir = "/dist/acme-writers-front";

app.use(express.static(__dirname + dist_dir));

server.listen(port, function() {
    console.log("App running on port " + port);
    console.log("Current dir: "+__dirname + dist_dir);
})

// PathLocationStrategy

app.get('', function(req, res) {

    res.sendFile(path.join( __dirname + dist_dir + access ));
});

app.get('/', function(req, res) {

    res.sendFile(path.join( __dirname + dist_dir + access ));
});
