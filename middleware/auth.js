module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('login_warning_msg', '請先登入。')
    res.redirect('/users/login')
  }
}