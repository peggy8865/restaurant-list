const express = require('express')
const router = express.Router()

const RestaurantModel = require('../../models/restaurant')

router.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
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

module.exports = router