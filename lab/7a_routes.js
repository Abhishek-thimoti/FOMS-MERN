const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Home Route'));
app.get('/user/:id', (req, res) => res.send(`Route Param ID: ${req.params.id}`));
app.get('/search', (req, res) => res.send(`Query Param: ${req.query.q}`));

app.listen(3000, () => console.log('Server started'));