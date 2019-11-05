module.exports = (app, passport) => {
  app.get('/', (req, res) => {
    res.render('index', {
      message : req.flash('loginMessage')
    })
  });

  app.get('/singup', (req, res) => {
    res.render('singup', {
      message : req.flash('singupMessage')
    });
  });

  app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/home',
    failureRedirect : '/',
    failureFlash : true
  }));

  app.post('/singup', passport.authenticate('local-singup', {
    successRedirect : '/home',
    failureRedirect : '/singup',
    failureFlash : true
  }));

  app.get('/home', isLoggedIn, (req, res) => {
    res.render('home', {
      user : req.user
    });
  });

  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    return res.redirect('/');
  };




}
