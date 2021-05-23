var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var db = require('./db');
var user = require('./controllers/usercontroller');
var game = require('./controllers/gamecontroller')
const { PORT } = require('./common/config');

db.sync();
app.use(bodyParser());
app.use('/api/auth', user);
app.use(require('./middleware/validate-session'))
app.use('/api/game', game);
// app.listen(function() {
//     console.log("App is listening on 4000");
// })

app.listen(PORT, () =>
    console.log(`App is listening on 4000`)
);