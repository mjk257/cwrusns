var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", function (req, res) {
    res.render("map");
});

module.exports = router;