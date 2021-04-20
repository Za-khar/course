const express = require('express')
const config = require('./Config')

const cors = require('cors')

const postsRoutes = require('./routes/postsRoutes')
const authRoutes = require('./routes/authRoutes')
const fileRoutes = require('./routes/fileRoutes')
const userRoutes = require('./routes/userRoutes')
const socialRoutes = require('./routes/socialRoutes')

const authMiddleware = require('./middleware//auth.middleware')

const app = express()
const port = config.get('PORT', 5000)
const host = config.get('HOST', 'localcost')

const corsOptions = {
  origin: `http://${config.get('CLIENT_HOST')}:${config.get('CLIENT_PORT')}`,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

app.use('/files', express.static('files'))
app.use(express.json())

app.use(authMiddleware)

app.use('/auth', authRoutes)
app.use('/social', socialRoutes)
app.use('/users', userRoutes)
app.use('/posts', postsRoutes)
app.use('/files', fileRoutes)

app.use((err, req, res, next) => {
  res.status(500).send('500 Server Error')
})

app.use((req, res) => {
  res.status(404).send('404 Not found')
})

app.listen(port, () => {
  console.log(`App listening at http://${host}:${port}`)
})
