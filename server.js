const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routeUser = require('./src/route/user');

app.use(
    bodyParser.urlencoded({
        extended :false
    })
)
app.listen(port);
console.log('"Server Is Running On Port', port);
routeUser(app);
