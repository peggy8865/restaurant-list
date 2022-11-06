// require packages used in the project
const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const restaurants = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// setting routes
app.get('/', (req, res) => {
  res.render('index', {restaurants: restaurants.results})
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurants.results.find(item => item.id.toString() === req.params.id)
  res.render('show', {restaurant: restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const restaurantFiltered = restaurants.results.filter(item => {
    const nameMatched = item.name.toLowerCase().includes(keyword.trim().toLowerCase())
    const categoryMatched = item.category.toLowerCase().includes(keyword.trim().toLowerCase())
    return nameMatched || categoryMatched
  })
  res.render('index', {restaurants: restaurantFiltered, keyword: keyword})
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})