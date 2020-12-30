const express = require('express');
const config = require('./Config');
const postsRoutes = require('./routes/postsRoutes');

const app = express();
const port = config.get('PORT', 5000);
const host = config.get('HOST', 'localcost');

app.use(express.json())

app.use('/posts', postsRoutes);

app.use((err, req, res, next) => {
    res.status(500).send('500 Server Error');
});

app.use((req, res) => {
    res.status(404).send('404 Not found');
});

app.listen(port, () => {
    console.log(`App listening at http://${host}:${port}`);
});
