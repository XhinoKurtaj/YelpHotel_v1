var express  = require("express");
var router   = express.Router();
var passport = require("passport");
var User     = require("../models/user");

router.get("/", function(req, res){
   res.render("landing");
});

//show register form
router.get("/register", function(req, res) {
   res.render("register");
});


router.post("/register",isValid, function(req, res) {
    var newUser = new User({username: req.body.username,email: req.body.email});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success","Welcome to YelpHotel  " + user.username);
            res.redirect("/hotels");
        });
    });
});



// SHOW login form
router.get("/login", function(req, res) {
    res.render("login");
});

// handling login logic
router.post("/login", passport.authenticate("local",
  {
      successRedirect: "/hotels",
      failureRedirect: "/login"
  }), function(req, res) {

});

//logic logut route
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/hotels");
});

function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       req.flash("error", "Please Login First!");
       res.redirect("/login");
    }

// function isValid(req, res, next){
//   var name = req.body.username;
//   var email = req.body.email;
//   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( email );
//   var password = req.body.password;
//   var passwordReg = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
//   if(name.length > 3 && email && emailReg && password != passwordReg){
//     return next();
//   }else{
//     req.flash("error", "Please enter at least three characters,Email format should be JohnDoe@example.com, Password should have atleast 8 characters, one upercase contains atleas one number");
//     res.redirect("/register")
//   }
// }
function isValid(req, res, next){
  var name = req.body.username;
  var email = req.body.email;
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test( email );
  var password = req.body.password;
  var passwordReg = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
  if(name.length > 3 && email == emailReg && password == passwordReg){
    return next();
  }else{
    req.flash("error", "Please enter at least three characters,Email format should be JohnDoe@example.com, Password should have atleast 8 characters, one upercase contains atleas one number");
    res.redirect("/register")
  }
}

module.exports = router;
