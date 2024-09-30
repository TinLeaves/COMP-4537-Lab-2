const http = require('http');
const url = require('url');
const utils = require('./modules/utils');
const message = require('./lang/en/en');

const server = http.createServer((req, res) => {

    const queryObject = url.parse(req.url, true).query;
    const name = queryObject.name;

    if (req.method === 'GET' && name) {
        const currentDate = utils.getDate().toString();

        const greetingMsg = `<p style="color: blue;">${message.hello.replace('%1', name)} ${currentDate}</p>`;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(greetingMsg);
    } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end(`${message.error}`);
    }
});

server.listen(8000, () => {
    console.log('Server is running on port 8000');
});
