const mongoose = require('mongoose')
const RestaurantModel = require('../restaurant')
const dummyData = require('../../restaurant.json')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI)
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  for (let i = 0; i < dummyData.results.length; i++) {
    RestaurantModel.create(dummyData.results[i])
  }
  console.log('done')
})