const http = require('http');
http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello Node.js Server Workflow\n');
}).listen(8080, () => console.log('Server running on 8080'));