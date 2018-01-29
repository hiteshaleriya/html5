var express = require('express');
var app = express();
var sse = require('./sse');

var connections = [];
var votes = { yes: 0, no: 0 };

app.use(sse);
app.use(express.static(__dirname+ './'));

app.get('/vote', function(req, res) {
    if (req.query.yes === "true") {
        votes.yes++;
    } else {
        votes.no++;
    }
    for (var i = 0; i < connections.length; i++) {
        connections[i].sseSend(votes)
    }
    res.sendStatus(200);
});

app.get('/stream', function(req, res) {
    res.sseSetup();
    res.sseSend(votes);
    connections.push(res);
});

app.get('/*', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, function() {
    console.log('Listening on port 3000...')
});
