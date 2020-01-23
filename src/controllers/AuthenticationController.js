const Authentication = require('../models/AuthenticationModel');

//get functions

module.exports.loginPage = (req, res) => {
  if (req.session.user) {
    return res.render('index');
  }
  res.render('login');
};


module.exports.registerPage = (req, res) => {
  res.render('register');
}


//post functions

module.exports.login = async (req, res) => {
  try {
    const authentication = new Authentication(req.body);
    await authentication.login();


    if (authentication.errors.length > 0){
      req.flash('errors', authentication.errors);
      req.session.save(() => {
        return res.redirect('back');
      });
      return;
    }

    req.flash('success', 'Login efetuado com sucesso.');
    req.session.user = authentication.user;
    req.session.save(() => {
      return res.redirect('back');
    })
  } catch (err) {
    console.log(err)
    return res.send('404');
  } 
}

module.exports.register = async (req, res) => {
  try {
    const authentication = new Authentication(req.body);
    await authentication.register();


    if (authentication.errors.length > 0) {
        req.flash('errors', authentication.errors);
        req.session.save(() => {
          return res.redirect('back');
        });
        return;
    }

    req.flash('success', 'Seu usuário foi cadastrado com sucesso !');
    req.session.save(() => {
      return res.redirect('back');
    });
  } catch (err) {
    console.log(err)
  }

}

module.exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
}