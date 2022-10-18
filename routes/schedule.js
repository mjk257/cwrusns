var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    {
        User
    } = require("../models/user"),
    {
        Course
    } = require("../models/user")
async = require("async"),
    nodemailer = require("nodemailer"),
    crypto = require("crypto"),
    middleware = require("../middleware");

router.get("/", function (req, res) {
    User.findById(req.params.id, function (err, foundUser) {
        if (err) {
            res.render("schedule");
        } else {
            if (foundUser && foundUser.schedule != null) {
                res.render("schedule", {
                    schedule: foundUser.schedule
                })
            } else {
                res.render("schedule", {
                    schedule: Array()
                });
            }
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
            schedule: Course.create(course)
        }
    }, function (err, newlyCreated) {
        if (err) {
            res.redirect("/error")
        } else {
            res.redirect("/schedule")
        }
    })
});

module.exports = router;