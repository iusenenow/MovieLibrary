if (process.env.NODE_ENV !== 'prodection') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')

const indexRouter = require('./routes/index')

app.set('view engine', "ejs")
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// Connected to mongodb
// mongodb+srv://iusenenow:tounima@cluster0-7ecr1.mongodb.net/test?retryWrites=true&w=majority
mongoose.connect(process.env.DATABASE_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


app.use('/', indexRouter)


app.listen(process.env.PORT || 5000)