var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            res.redirect("/error");
        } else {
            res.render("schedule")
        }
    })
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    var course = {
        name: req.body.name,
        startTime: req.body.start,
        endTime: req.body.end,
        location: req.body.location,
        days: req.body.day
    }
    User.updateOne({
        _id: req.user._id
    }, {
        $push: {
            schedule: course
        }
    }, function (err, newlyCreated) {
        if (err) {
            res.redirect("/error")
        } else {
            res.redirect("/schedule")
        }
    })
});

router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    User.updateOne({
        _id: req.user._id
    }, {
        $pullAll: {
            schedule: [{
                _id: req.params.id
            }]
        }
    }, function (err) {
        if (err) {
            res.redirect("/error")
        } else {
            res.redirect("/schedule")
        }
    })
});

module.exports = router;