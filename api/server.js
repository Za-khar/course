const express = require('express');
const config = require('./Config');

const app = express();
const port = config.get('PORT', 5000);
const host = config.get('HOST', 'localcost');

app.get('/', (req, res) => {
    res.send('Good!');
});

app.get('/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!`);
});

app.use((err, req, res, next) => {
    res.status(502).send('502 Server Error');
});

app.use((req, res) => {
    res.status(404).send('404 Not found');
});

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});
