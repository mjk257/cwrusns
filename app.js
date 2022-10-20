var express = require("express"),
  app = express(),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose"),
  flash = require("connect-flash"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./models/user");

var indexRoutes = require("./routes/index"),
  scheduleRoutes = require("./routes/schedule"),
  mapRoutes = require("./routes/map"),
  reccRoutes = require("./routes/recc");


// APP CONFIG
mongoose.connect("mongodb://localhost:27017/cwru_sns", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
// mongoose.connect("mongodb+srv://admin:W1llmgEj0SdeZTQw@cluster0.rlpardo.mongodb.net/?retryWrites=true&w=majority", {
//   useNewUrlParser: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// }).then(() => {
//   console.log("Connected to DB");
// }).catch(err => {
//   console.log("ERROR:", err.message);
// });
app.set("view engine", "ejs");
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(express.static("public"));
app.use(express.static("uploads"));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(methodOverride("_method"));
app.use(flash());
app.locals.moment = require("moment");
app.use(express.static(__dirname + '/'));

//PASSPORT CONFIG
app.use(require("express-session")({
  secret: "CSDS 393 Software Engineering Project",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
});

//ROUTES
app.use("/schedule", scheduleRoutes);
app.use("/map", mapRoutes);
app.use("/reccomendations", reccRoutes);
app.use(indexRoutes);


//ERROR HADNLING
app.use(function (req, res, next) {
  res.status(404);
  res.render("404");
});

app.listen(process.env.PORT || 3000, process.env.IP, function () {
  console.log("CWRU SNS Server is Running");
});

// module.exports = app