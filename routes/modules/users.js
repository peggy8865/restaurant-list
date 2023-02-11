const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')

const UserModel = require('../../models/user')

router.get('/login', (req, res) => {
  let [error] = req.flash('error')
  if (error === 'Missing credentials') {
    error = '請輸入您的信箱、密碼。'
  }
  res.render('login', { error })
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  
  UserModel.findOne({ email }).then(user => {    
    if (user) {
      errors.push({ message: '此帳號已有人註冊。' })
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    if (!email || !password || !confirmPassword) {
      errors.push({ message: '信箱、密碼、確認密碼為必填欄位。' })
    }
    if (password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符。' })
    }
    if (errors.length) {
      return res.render('register', { errors, name, email, password, confirmPassword })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => UserModel.create({ name, email, password: hash }))
      .then(() => res.redirect('/'))

  }).catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('logout_msg', '您已成功登出。')
  res.redirect('/users/login')
})

module.exports = router