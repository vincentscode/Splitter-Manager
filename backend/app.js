const express = require('express');
const cors = require('cors')

const logger = require('./middleware/logger');
const config = require('./config')
const mongodb = require('./datasource/mongodb')

const users = require('./endpoints/users/routes');
const characters = require('./endpoints/characters/routes');

// app
const app = express();

// middleware
app.use(cors())
app.use(logger);
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// endpoints
app.use('/api/users', users);
app.use('/api/characters', characters);

// handle next(error) calls
app.use((info, req, res, next) => {
  const { status, message } = info
  console.error(JSON.stringify(info, null, 2))
  res.status(status).send(message)
})

// startup
start = async () => {
  // connect to mongo
  await mongodb.connect()
  console.log('Connected to database')

  // start listening
  app.listen(config.port, () => {
    console.log(`Listening on http://localhost:${config.port}`)
  })
}
start()
