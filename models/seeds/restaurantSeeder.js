const bcrypt = require('bcryptjs')
const UserModel = require('../user')
const RestaurantModel = require('../restaurant')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678'
  }, {
    email: 'user2@example.com',
    password: '12345678'
  }]

const SEED_RESTAURANT = require('../../restaurant.json').results

db.once('open', () => {
  SEED_USER.forEach(user => {
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => UserModel.create({
        email: user.email,
        password: hash
      }))
      .then(user => {
        let isUser1 = user.email === 'user1@example.com'
        isUser1 = isUser1 ? 1 : 2
        const promiseArray = []

        SEED_RESTAURANT.forEach(restaurant => {
          const restaurantIdMatched = (restaurant.id >= isUser1 * 3 - 2) && (restaurant.id <= isUser1 * 3)
          if (restaurantIdMatched) {
            restaurant.userId = user._id
            promiseArray.push(RestaurantModel.create(restaurant))
          }
        })
        return Promise.all(promiseArray)
      })
      .then(() => {
        RestaurantModel.find()
          .lean()
          .then(restaurants => {
            if (restaurants.length === 6) {
              console.log('done')
              process.exit()
            }
          })
      })
  })
})