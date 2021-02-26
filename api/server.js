const express = require('express');
const config = require('./Config');
var cors = require('cors');

const postsRoutes = require('./routes/postsRoutes');
const authRoutes = require('./routes/authRoutes');

const authMiddleware = require('./middleware//auth.middleware');

const app = express();
const port = config.get('PORT', 5000);
const host = config.get('HOST', 'localcost');

app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3001',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

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
