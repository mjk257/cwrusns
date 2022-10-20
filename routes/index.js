var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user");

router.get("/error", function (req, res) {
  res.render("error");
});

router.get("/", function (req, res) {
  res.render("index");
});

//AUTHENTICATION ROUTES
router.get("/register", function (req, res) {
  res.render("register")
});

router.post("/register", function (req, res) {
  if (req.body.password === req.body.passwordC) {
    User.register(new User({
      username: req.body.username,
      schedule: [],
    }), req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    })
  } else {
    res.redirect("/register")
    req.flash("error", "Passwords Did Not Match");
  }
});

router.get("/login", function (req, res) {
  res.render("login")
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect('/login');
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      var redirectTo = req.session.redirectTo ? req.session.redirectTo : '/';
      delete req.session.redirectTo;
      res.redirect(redirectTo);
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

module.exports = router;