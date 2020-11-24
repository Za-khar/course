const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Good!');
});

app.get('/:name', (req, res) => {
    res.send(`Hello ${req.params.name}!`);
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
