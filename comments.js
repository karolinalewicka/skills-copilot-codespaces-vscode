// Create web server
// npm install express
// npm install body-parser
// npm install mongoose
// npm install ejs
// npm install method-override
// npm install express-sanitizer
// npm install nodemon
// npm install passport
// npm install passport-local
// npm install passport-local-mongoose

// 1. Require the express module
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var User = require("./models/user");
var methodOverride = require("method-override");
var expressSanitizer = require("express-sanitizer");

// 2. Connect to mongoDB
mongoose.connect("mongodb://localhost/yelp_camp_v6");

// 3. Use body-parser
app.use(bodyParser.urlencoded({extended: true}));

// 4. Set the view engine to ejs
app.set("view engine", "ejs");

// 5. Use express.static
app.use(express.static(__dirname + "/public"));

// 6. Use method-override
app.use(methodOverride("_method"));

// 7. Use express sanitizer
app.use(expressSanitizer());

// 8. Seed the database
seedDB();

// 9. Use express-session
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));

// 10. Use passport
app.use(passport.initialize());
app.use(passport.session());

// 11. Use passport-local
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 12. Middleware
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

// 13. RESTful routes

// Landing page
app.get("/", function(req, res) {
    res.render("landing");
});

// Index route
app.get("/comments/new", isLoggedIn, function(req, res) {
    res.render("new");
});
