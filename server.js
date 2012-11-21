var express = require('express'),
    app = express();


app.use(express.bodyParser());
app.use(express.static(__dirname));
app.use(app.router);

app.listen(3001);