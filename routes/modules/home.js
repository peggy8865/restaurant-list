const express = require('express')
const router = express.Router()

const RestaurantModel = require('../../models/restaurant')

function getSortOrder(sortOption) {
  switch (sortOption) {
    case 'AtoZ': return { name: 'asc' };
    case 'ZtoA': return { name: 'desc' };
    case 'category': return { category: 'asc' };
    case 'location': return { location: 'asc' };
    default: return { _id: 'asc' }
  }
}

router.get('/', (req, res) => {
  const sort = req.query.sort
  RestaurantModel.find()
    .lean()
    .sort(getSortOrder(sort))
    .then(restaurants => res.render('index', { restaurants, sort }))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  RestaurantModel.find()
    .lean()
    .sort(getSortOrder(sort))
    .then(restaurants => {
      let restaurantsFiltered = restaurants.filter(item => {
        const nameMatched = item.name.toLowerCase().includes(keyword.trim().toLowerCase())
        const categoryMatched = item.category.toLowerCase().includes(keyword.trim().toLowerCase())
        return nameMatched || categoryMatched
      })
      restaurantsFiltered = restaurantsFiltered.length ? restaurantsFiltered : false
      res.render('index', { restaurants: restaurantsFiltered, keyword, sort })
    })
    .catch(error => console.log(error))
})

module.exports = router