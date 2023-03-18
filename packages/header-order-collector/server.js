const express = require('express');
const app = express();
const port = 3000;

function extractHeaderNames(rawHeaders) {
    return rawHeaders.filter((_, i) => i % 2 === 0);
}

app.get('/', (req, res) => {
    res.header('set-cookie', 'A=1; Path=/headers; HttpOnly');
    res.send(`
<a href="/headers">Click here</a> to see the headers.
`)
})

app.get('/headers', (req, res) => {
    const rawHeaders = req.rawHeaders;
    const headerNames = extractHeaderNames(rawHeaders);
    res.json(headerNames);
});


function runServer() {
    return new Promise(r => {
        const inst = app.listen(port, (err) => {
                if (err) {
                    throw new Error(err);
                }

                r(inst);
            });
    });
}

module.exports = {
    runServer,
    app,
}