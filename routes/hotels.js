var express = require("express");
var router = express.Router();
var hotel = require("../models/hotel");



router.get("/hotels", function(req, res){
    hotel.find({}, function(err, allHotels){
        if(err){
            console.log(err);
        }else{
            res.render("hotels/Index",{hotels: allHotels});
        }
    });
});


router.post("/hotels", isLoggedIn, function(req, res){
    var name = req.body.name;  //grabing name from form
    var price = req.body.price;
    var image = req.body.image; //grabing image from form
    var desc = req.body.description; //grabing description from form
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newHotel = {name: name, price: price, image: image, description:desc, author:author}  
    hotel.create(newHotel, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
             res.redirect("/hotels");
        }
    });
}); 

router.get("/hotels/new", isLoggedIn, function(req, res) {
   res.render("hotels/new");
});

router.get("/hotels/:id", function(req, res) {
    hotel.findById(req.params.id).populate("comments").exec(function(err, foundHotel){
        if(err){
            console.log(err);
        }else{
           res.render("hotels/show", {hotel:foundHotel}); 
        }
    });
});

router.get("/hotels/:id/edit", checkHotelOwnerShip, function(req, res) {
  hotel.findById(req.params.id, function(err, foundHotel){
      if(err){
          console.log(err);
      }
    res.render("hotels/edit",{hotel: foundHotel});   
    });
});

router.put("/hotels/:id/", checkHotelOwnerShip, function(req, res){
   hotel.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedHotel){
       if (err){
           res.redirect("/hotels");
       }else{
           res.redirect("/hotels/" + req.params.id);
       }
   });
});

router.delete("/hotels/:id/", checkHotelOwnerShip, function(req, res){
    hotel.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/hotels");
        }else{
            res.redirect("/hotels");
        }
    });
});

function checkHotelOwnerShip(req, res, next){
      if(req.isAuthenticated()){
             hotel.findById(req.params.id, function(err, foundHotel){
              if(err){
                   req.flash("error", "Hotel not found");
                   res.redirect("/hotels");
              }else{
                  if(foundHotel.author.id.equals(req.user._id)){
                    next();  
                  }else{
                       req.flash("error", "You don't have permission to do that");
                       res.redirect("back");
                  }
            }
    });
          }else{
          req.flash("error", "You need to be logged in to do that");
          res.redirect("back");
       }
}

function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       req.flash("error", "You need to be logged in to do that");
       res.redirect("/login");
    }


module.exports = router;