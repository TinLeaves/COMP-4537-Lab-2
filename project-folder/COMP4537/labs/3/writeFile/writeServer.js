const http = require('http');
const url = require('url');
const fs = require('fs'); 
const message = require('../lang/en/en.js');

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const queryObject = parsedUrl.query;

    if (req.method === 'GET' && parsedUrl.pathname.includes('writeFile')) {
        const text = queryObject.text;
        if (text) {
            const filePath = '../readFile/file.txt';  
            
            fs.appendFile(filePath, text + '\n', (err) => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.end(`${message.appended}${text}`);
            });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(message.writeError); 
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end(message.writeError);
    }
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
