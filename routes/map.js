var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Location = require("../models/location");

router.get("/", function (req, res) {
    Location.find({}).sort({
        name: 1
    }).exec(function (err, foundLocations) {
        if (err) {
            res.redirect("/error");
        } else {
            res.render("map", {
                locations: foundLocations
            });
        }
    })
});

router.get("/:id", function (req, res) {
    Location.find({}).sort({
        name: 1
    }).exec(function (err, foundLocations) {
        if (err) {
            res.redirect("/error");
        } else {
            var location = foundLocations.find(({
                _id
            }) => _id == req.params.id);
            res.render("map", {
                locations: foundLocations,
                location: location
            })
        }
    })
})

router.post("/", function (req, res) {
    Location.find({}).sort({
        name: 1
    }).exec(function (err, foundLocations) {
        if (err) {
            res.redirect("/error");
        } else {
            var location = foundLocations.find(({
                name
            }) => name == req.body.destination);
            res.render("map", {
                locations: foundLocations,
                location: location
            })
        }
    })
})


module.exports = router;