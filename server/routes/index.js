var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
var path = require("path");

mongoose.connect("mongodb://localhost:27017/kappa_cats");

var Cat = mongoose.model("Cat", {name:String});

router.post("/cats", function(req,res){
    var kitty = new Cat({name: req.body.catName});
    //console.log("req body",req.body);
    //console.log("hopefully req.body.catName", req.body.catName);
    kitty.save(function(err){
        if(err){
          console.log( "We had an error",err);
        }
        //console.log("we saved a kitt?");
        res.send(kitty.toJSON());
    });
});

router.get("/cats", function(req,res){
    Cat.find({}).exec(function(err, cats){
        if(err){
          console.log(err);
        }

        res.send(cats);
    });
});

router.get("/*", function(req,res){
    //console.log(req.params);
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});

module.exports = router;
