var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    middleware = require("../middleware");

router.get("/", middleware.isLoggedIn, function (req, res) {
    res.render("schedule");
});

router.post("/", middleware.isLoggedIn, function (req, res) {
    var course = {
        name: req.body.name,
        startTime: req.body.start,
        endTime: req.body.end,
        location: req.body.location,
        days: req.body.day
    }
    if (compTime(req.body.start, req.body.end)) {
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
    } else {
        res.redirect("/schedule")
        req.flash("error", "Start time must be before end time");
    }
});

router.delete("/:id", middleware.isLoggedIn, function (req, res) {
    User.updateOne({
        _id: req.user._id
    }, {
        $pull: {
            schedule: {
                _id: req.params.id
            }
        }
    }, function (err) {
        if (err) {
            console.log(err)
            res.redirect("/error")
        } else {
            res.redirect("/schedule")
        }
    })
});

function compTime(time1, time2) {
    var a1 = time1.split(':');
    var time1Seconds = (+a1[0]) * 60 * 60 + (+a1[1]) * 60;
    var a2 = time2.split(':');
    var time2Seconds = (+a2[0]) * 60 * 60 + (+a2[1]) * 60;
    return time1Seconds < time2Seconds;
}

module.exports = router;