var express      = require("express"),
    app          = express(),
    bodyParser   = require("body-parser"),
    mongoose     = require ("mongoose"),
    Campground   = require("./models/campground");

mongoose.connect("mongodb+srv://anand:worldwar@3@cluster0.wfy63.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//SCHEMA SETUP

// Campground.create(
//     {
//         name:"Somewhere", 
//         image:"https://notonthemap.in/images/places/camp-meesapulimala.jpg",
//         description:"This is a huge granite hill, no bathrooms, No water, Beautiful granite"
        
//     }, function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND");
//           console.log(campground);
//       }
//     });

 
app.get("/", function(req, res){
    res.render("landing");
});

//INDEX---SHOW ALL CAMPGROUND
app.get("/campgrounds", function(req, res){
   //get all campground from DB
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
          res.render("index",{campgrounds:allcampgrounds});
        }
    });
});

//CREATE----ADD NEW CAMPGROUND TO DB
app.post("/campgrounds", function(req, res){
    //get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var newCampground = {name: name, image: image, description: desc};
   //create a new campground and save to DB
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else{
            //redirect back to campgrounds page
            res.redirect("/campgrounds");
       }
   });
  
});

//NEW----SHOW FORM TO CREATE NEW CAMPGROUND
app.get("/campgrounds/new", function(req, res) {
    res.render("new.ejs"); 
});

//SHOW-----SHOOWS MORE INFO
app.get("/campgrounds/:id", function(req, res) {
    //find the campground with ID
    Campground.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       } else{
            //render show template with that function
            res.render("show", {campground:foundCampground});
       }
    });
});

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log ("YelpCamp Has Started");
});