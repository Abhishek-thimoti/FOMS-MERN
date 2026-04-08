const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(session({secret: 'key', resave: false, saveUninitialized: true}));

app.get('/', (req, res) => {
    res.cookie('myCookie', 'cookieValue');
    req.session.user = "John";
    res.send("Cookie and Session Set");
});
app.listen(3000);