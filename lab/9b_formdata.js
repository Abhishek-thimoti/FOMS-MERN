const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    res.send(`Form Data Received: ${JSON.stringify(req.body)}`);
});
app.listen(3000);