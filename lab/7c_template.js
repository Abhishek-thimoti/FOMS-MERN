const express = require('express');
const app = express();
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { message: 'Hello from Template Engine' });
});
app.listen(3000);

// Create a folder named 'views' and add index.ejs:
// <h1><%= message %></h1>