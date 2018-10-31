var express = require("express");
var router = express.Router();
var hotel = require("../models/hotel");
var Comment = require("../models/comment");


router.get("/hotels/:id/comments/new", isLoggedIn,  function(req, res){
    hotel.findById(req.params.id, function(err, hotel){
        if(err){
            console.log(err);
        }else{
           res.render("comments/new", {hotel: hotel});     
        }
    });
});

router.post("/hotels/:id/comments", isLoggedIn, function(req, res){
    hotel.findById(req.params.id, function(err, hotel){
        if(err){
            console.log(err);
            res.redirect("/hotels");
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                }else{
                    //add username and id to comment 
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    hotel.comments.push(comment);
                    hotel.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect('/hotels/' + hotel._id);
                }
            });
        }
    });    
});

// COMMENT EDIT ROUTE
router.get("/hotels/:id/comments/:comment_id/edit",checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if (err){
            res.redirect("back")
        }else{
            res.render("comments/edit", {hotel_id: req.params.id, comment: foundComment});
        }
    });
    
});
// COMMENT UPDATE
router.put("/hotels/:id/comments/:comment_id",checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           res.redirect("back");
       }else{
           res.redirect("/hotels/" + req.params.id);
       }
   });
});

//COMMENT DELETE
router.delete("/hotels/:id/comments/:comment_id",checkCommentOwnership,  function(req, res){
    Comment.findByIdAndDelete(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/hotels/"+ req.params.id);
        }
    });
});


// middleware
function isLoggedIn(req, res, next){
       if(req.isAuthenticated()){
           return next();
       }
       req.flash("error", "You need to be logged in to do that");
       res.redirect("/login");
    }
    

function checkCommentOwnership(req, res, next){
    if(req.isAuthenticated()){
             Comment.findById(req.params.comment_id, function(err, foundComment){
              if(err){
                   res.redirect("back")
              }else{
                  if(foundComment.author.id.equals(req.user._id)){
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
       };
}     

module.exports = router;