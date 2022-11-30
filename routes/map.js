var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    Location = require("../models/location");

router.get("/", function (req, res) {
    Location.find({}, function (err, foundLocations) {
        if (err) {
            res.redirect("/error");
        } else {
            res.render("map", {
                locations: foundLocations
            });
        }
    })
});
module.exports = router;