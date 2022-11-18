// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const RestaurantModel = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect to mongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting body-parser
app.use(express.urlencoded({extended: true}))

// setting routes
app.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  RestaurantModel.find()
    .lean()
    .then(restaurants => {
      let restaurantsFiltered = restaurants.filter(item => {
        const nameMatched = item.name.toLowerCase().includes(keyword.trim().toLowerCase())
        const categoryMatched = item.category.toLowerCase().includes(keyword.trim().toLowerCase())
        return nameMatched || categoryMatched
      })
      restaurantsFiltered = restaurantsFiltered.length ? restaurantsFiltered : false
      res.render('index', { restaurants: restaurantsFiltered, keyword })
    })
    .catch(error => console.log(error))
})

// create a restaurant
app.post('/restaurants', (req, res) => {
  RestaurantModel.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// get to edit page
app.get('/restaurants/:id/edit', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// edit the restaurant
app.post('/restaurants/:id', (req, res) => {
  const restaurantEdited = req.body
  RestaurantModel.findById(req.params.id)
    .then(restaurant => {
      for (let key in restaurantEdited) {
        restaurant[key] = restaurantEdited[key]
      }
      restaurant.save()
    })
    .then(() => res.redirect(req.originalUrl))
    .catch(error => console.log(error))
})

// delete the restaurant
app.post('/restaurants/:id/delete', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})