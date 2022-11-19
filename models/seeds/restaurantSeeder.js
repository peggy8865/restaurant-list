const RestaurantModel = require('../restaurant')
const dummyData = require('../../restaurant.json')
const db = require('../../config/mongoose')

db.once('open', () => {
  for (let i = 0; i < dummyData.results.length; i++) {
    RestaurantModel.create(dummyData.results[i])
  }
  console.log('done')
})