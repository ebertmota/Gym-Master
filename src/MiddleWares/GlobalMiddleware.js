module.exports.checkMessages = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

module.exports.checkCsrfError = (err, req, res, next) => {
  if (err.code === '404') {
    return res.send('404');
  }

  next();
}

module.exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
}

module.exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'Você precisa fazer login');
    req.session.save(() => res.redirect('/'))
    return
  }
  next();
}



    
