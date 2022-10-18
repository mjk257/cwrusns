var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user"),
    async = require("async"),
        nodemailer = require("nodemailer"),
        crypto = require("crypto"),
        middleware = require("../middleware");

router.get("/", function (req, res) {
    res.render("schedule");
});

router.post("/", function (req, res) {

});

module.exports = router;