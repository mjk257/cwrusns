var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Location = require("../models/location"),
    User = require("../models/user");

router.get("/", function (req, res) {
    Location.find({}, function (err, foundLocations) {
        if (err) {
            res.redirect("/error")
        } else {
            const food = [];
            const study = [];
            const leisure = [];
            var nextClass;
            var time;
            if (req.user) {
                nextClass = getNextClass(req.user);
                if (typeof nextClass != "undefined") {
                    time = compTime(nextClass.startTime)
                }
            }

            foundLocations.forEach(function (location) {
                if (shouldAdd(location, req.user, foundLocations)) {
                    if (location.type.includes("Food")) {
                        food.push(location);
                    }
                    if (location.type.includes("Leisure")) {
                        leisure.push(location);
                    }
                    if (location.type.includes("Study")) {
                        study.push(location);
                    }
                }
            })
            res.render("recc", {
                locations: foundLocations,
                food: food,
                study: study,
                leisure: leisure,
                nextClass: nextClass,
                time: time
            });
        }
    })
});

function compTime(time) {
    var a = time.split(':');
    var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60;
    var date = new Date();
    var dateTime = date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds();
    return seconds - dateTime;
}

function getNextClass(user) {
    var nextClass;
    var comTime;
    var minTime = Infinity;
    var today = new Date().getDay();
    if (user) {
        user.schedule.forEach(function (course) {
            comTime = compTime(course.startTime);
            if (course.days.includes(today) && comTime > 0 && comTime < minTime) {
                minTime = comTime;
                nextClass = course;
            }
        })
        return nextClass;
    } else {
        return nextClass;
    }
}

function shouldAdd(location, user, locations) {
    if (user) {
        var course = getNextClass(user);
        if (typeof course != "undefined") {
            var time = Math.round(compTime(course.startTime) / 60);
            var courseZone = locations.find(({
                name
            }) => name === course.location).zone;
            if (time <= 30 && location.zone == courseZone) {
                return true;
            } else if (time > 30 && time <= 90 && (location.zone == "Quad" || location.zone == "Mather")) {
                return true;
            } else if (time > 90) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return true;
    }
}

module.exports = router;