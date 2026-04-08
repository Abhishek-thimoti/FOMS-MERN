const express = require('express');
const app = express();
app.use(express.json());

let data = { item: "Resource" };

app.post('/data', (req, res) => { data = req.body; res.send('Data Accepted'); });
app.get('/data', (req, res) => { res.json(data); });
app.delete('/data', (req, res) => { data = null; res.send('Resource Deleted'); });

app.listen(3000);