const express = require('express');
const config = require('./Config');

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

const authMiddleware = require('./middleware//auth.middleware');

const app = express();
const port = config.get('PORT', 5000);
const host = config.get('HOST', 'localcost');

app.use(express.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(authMiddleware);

app.use('/auth', authRoutes);
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
