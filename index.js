var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('{ "response": "ayeni clement project" }');
});

app.get('/next', function (req, res) {
    res.send('{ "response": "ayeni clement project" }');
});
app.get('/ok', function (req, res) {
    res.send('{ "response": " Nice Job!, cool job and weldone!" }');
});
app.listen(process.env.PORT || 3000);
module.exports = app;
