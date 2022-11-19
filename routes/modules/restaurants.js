const express = require('express')
const router = express.Router()

const RestaurantModel = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

router.post('/', (req, res) => {
  RestaurantModel.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
  RestaurantModel.findById(req.params.id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router