const express = require('express');
const app = express();
app.use(express.json());

const users = { "admin": "password123" };

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if(users[username] === password) res.send("Authenticated successfully");
    else res.status(401).send("Unauthorized");
});
app.listen(3000);