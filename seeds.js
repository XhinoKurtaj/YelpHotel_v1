var mongoose = require("mongoose");
var hotel = require("./models/hotel");
var Comment = require("./models/comment");

var data = [
        {
            name: "Silent Hills",
            image: "https://images.unsplash.com/photo-1540233797181-c10cbfa4ebda?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=f0455a3991ad5cc198199bc1ce19663e&auto=format&fit=crop&w=500&q=60",
            description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        },
        {
            name: "Dajti Mountain",
            image: "https://images.unsplash.com/photo-1540301499174-5062d7e66ce8?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8b2c361db249187ca9edc1441237ead6&auto=format&fit=crop&w=500&q=60",
            description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        },
        {
            name: "Lake Hills",
            image: "https://images.unsplash.com/photo-1540253333570-41c2227e4452?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=09f9987927f526be64ca95a5b39f123f&auto=format&fit=crop&w=500&q=60",
            description: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure"
        }
    ]

function seedDB(){
     hotel.remove ({}, function(err){
      if(err){
        console.log(err);
      }
     console.log("removed hotels");
      data.forEach(function(seed){
      hotel.create(seed,function(err, hotel){
          if(err){
              console.log(err);
          }else{
              console.log("added a chotel");
              //create a coment
             Comment.create(
                 {
                     text:"This place is great",
                     author: "Tupac"
                 },function(err,comment){
                     if(err){
                         console.log(err);
                     }else{
                      hotel.comments.push(comment);
                      hotel.save();
                      console.log("Created a new comment")
                     }
                 });
          }
      });
  });
  });
}

module.exports = seedDB;
