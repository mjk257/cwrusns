var express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user"),
  async = require("async"),
    nodemailer = require("nodemailer"),
    crypto = require("crypto"),
    middleware = require("../middleware");

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
  if (req.body.password === req.body.passwordC && req.body.key === "Spicy Ramen" && req.body.email === req.body.emailC) {
    User.register(new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email
    }), req.body.password, function (err, user) {
      if (err) {
        console.log(err);
        return res.render("register");
      }
      passport.authenticate("local")(req, res, function () {
        res.redirect("/");
      });
    })
  } else {
    res.redirect("/register")
    req.flash("error", "Passwords Did Not Match or Key Incorect");
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
  req.logout();
  res.redirect("/");
});



router.get('/reset/:token', function (req, res) {
  User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: {
      $gt: Date.now()
    }
  }, function (err, user) {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot');
    }
    res.render('reset', {
      token: req.params.token
    });
  });
});

router.post('/reset/:token', function (req, res) {
  async.waterfall([
    function (done) {
      User.findOne({
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          $gt: Date.now()
        }
      }, function (err, user) {
        if (!user) {
          req.flash('error', 'Password reset token is invalid or has expired.');
          return res.redirect('back');
        }
        if (req.body.password === req.body.confirm) {
          user.setPassword(req.body.password, function (err) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            user.save(function (err) {
              req.logIn(user, function (err) {
                done(err, user);
              });
            });
          })
        } else {
          req.flash("error", "Passwords do not match.");
          return res.redirect('back');
        }
      });
    },
    function (user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'outdoorleadershiphelp@gmail.com',
          pass: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'outdoorleadershiphelp@gmail.com',
        subject: 'Your password has been changed',
        text: 'Hello,\n\n' +
          'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        req.flash('success', 'Success! Your password has been changed.');
        done(err);
      });
    }
  ], function (err) {
    res.redirect('/');
  });
});

module.exports = router;