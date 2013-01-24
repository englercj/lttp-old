var express = require('express'),
    app = express(),
    PORT = 3001;

app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(app.router);

app.listen(PORT, function() {
    console.log('listening on localhost:'+PORT);
});