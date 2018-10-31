var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    hotel          = require("./models/hotel"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");
// requiring routes
var commentRoutes    = require("./routes/comments"),
    hotelRoutes = require("./routes/hotels"),
    authRoutes       = require("./routes/index");

    mongoose.connect("mongodb://localhost/rotel");
    app.use(bodyParser.urlencoded({extended: true}));
    app.set("view engine", "ejs");
    app.use(express.static(__dirname + "/public"));
    app.use(methodOverride("_method"));
    app.use(flash());
    // seedDB(); //seed the database

// PASSPORT CONFIGURATION
    app.use(require("express-session")({
           secret: "Password Phase",
           resave: false,
           saveUninitialized: false
         }));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new LocalStrategy(User.authenticate()));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());

    //pas current user in every single template
    app.use(function(req, res, next){
             res.locals.currentUser = req.user;
             res.locals.error = req.flash("error");
             res.locals.success = req.flash("success");
             next();
        });

    app.use(authRoutes);
    app.use(hotelRoutes);
    app.use(commentRoutes);

    app.listen(3000, function(){
        console.log("Connected Successfuly!!");
    });
