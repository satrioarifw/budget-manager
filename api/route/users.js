var passport = require('passport');

exports.login = function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {;
      return res.json(400, {message: "Bad User"});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.send(200);
    });
  })(req, res, next);
};

exports.logout = function(req, res) {
  req.session.destroy();
  req.logout();
  res.send(200);
}