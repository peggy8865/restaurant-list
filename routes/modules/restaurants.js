const express = require('express')
const router = express.Router()

const RestaurantModel = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestaurantModel.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  const newRestaurant = req.body
  newRestaurant.userId = req.user._id
  RestaurantModel.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestaurantModel.findOne({ _id, userId })
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const restaurantEdited = req.body
  RestaurantModel.findOne({ _id, userId })
    .then(restaurant => {
      for (let key in restaurantEdited) {
        restaurant[key] = restaurantEdited[key]
      }
      restaurant.save()
    })
    .then(() => res.redirect(req.originalUrl))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  RestaurantModel.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router