var express = require('express');
var app =  express();
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static( __dirname + '/beltexamapp/dist' ));
var path = require('path');
// Require Mongoose
var mongoose = require('mongoose');
// This is how we connect to the mongodb database using mongoose -- "quoting_dojo" is the title of
//   our db in mongodb -- this should match the name of the db you are going to use for your project.
mongoose.connect('mongodb://localhost/beltExam');
// Use native promises
mongoose.Promise = global.Promise;

var DbSchema = new mongoose.Schema({
    name: {type: String, minlength: 3},
    type: {type: String, minlength: 3},
    description: {type: String, minlength: 3},
    skills: [{type: String}],
    likes: {type: Number, default: 0}
},
{
    timestamps: true
});

mongoose.model('Pet', DbSchema);
var Pet = mongoose.model('Pet');

//show all 'pets' via JSON
app.get('/all', function(req, res){
    Pet.find({}, function(err, pet){
       res.json(pet);
    })
})

//create new pet
app.post('/pet', function(req,res){
    var pet = new Pet({
        name: req.body.name, 
        type: req.body.type, 
        description: req.body.description,
        skills: [req.body.skills_1,req.body.skills_2,req.body.skills_3 ],
    });
    pet.save(function(err){
        if(err){
            console.log("something went wrong");
            res.json({error: err})

        }else{
            console.log("SUCCESS NEW pet");
            res.json(pet);
        }
    })
})

//get specific pet
app.get('/pet/:id', function(req, res){
    Pet.findById(req.params.id, function(err, pet){
        res.json(pet);
    })
})
app.get('/name/:name', function(req, res){
    Pet.findOne({name: req.params.name}, function(err, pet){
        res.json(pet);
    })
})

//remove a specific user
app.delete('/pet/:id', function(req,res){
    Pet.findByIdAndRemove(req.params.id, function(err, pet){
        res.json(pet)
    })
})

//update a specific user
app.put("/pet/:id", function(req, res) {
    Pet.findById(req.params.id, function(err, pet) {
        pet.name = req.body.name;
        pet.type = req.body.type;
        pet.description = req.body.description;
        pet.skills[0] = req.body.skills[0];
        pet.skills[1] = req.body.skills[1];
        pet.skills[2] = req.body.skills[2];
        pet.save(function(err) {
          // if there is an error console.log that something went wrong!
          if (err) {
              res.json({error: err});
          } else {
              res.json(pet);
          }
        })
    })
})

app.get("/like/:id", function(req, res) {
    Pet.findById(req.params.id, function(err, pet) {
        pet.likes = pet.likes +1;
        pet.save(function(err) {
          if (err) {
              res.json({message: "Error", error: err});
          } else {
              res.json(pet);
          }
        })
    })
})



app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./beltexamapp/dist/index.html"))
});

app.listen(8000, function() {
    console.log("listening on port 8000");
})