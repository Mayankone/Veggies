const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();
const myVeggie = require('./models/veggies');
const app = express();

app.use(express.json());
app.use(express.static('public')); //Serving public folder


let connectionString = 'mongodb+srv://PerScholasUser:Benjiprice10@cluster0.naxgcuo.mongodb.net/Vegetables?retryWrites=true&w=majority'


mongoose.set('strictQuery', false);
// connect to our MongoDB database (our Models specify which collections)
mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
// function will activate once to let us know we are connected
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});



app.post('/create_veggie', async (req, res) => {

    const {nameString: name, colorString: color, ageNumber: age, readyBool: readyToEat} = req.body;
    
    // console.log("Uploading to database");
    let returnedValue = await myVeggie.create({
        name,
        color,
        age,
        readyToEat
    });

    console.log(returnedValue);
    if(returnedValue){
        console.log("Upload complete!");
    } 
    res.send(returnedValue);
}) 

app.delete("/delete_nameless_data", async (req, res) => {
    let deletedItemsArray = await myVeggie.deleteMany({name: ""});

    console.log(deletedItemsArray);

    res.send(`deleted ${deletedItemsArray.deletedCount} items`)
})

app.get('/get_food_data', async (req, res) => {
    let response = await myVeggie.find({});
    console.log(response);
    res.json(response);
})

app.get('/get_single/:veggie', async (req, res) => {
    let veggie = req.params.veggie;
    let response = await myVeggie.findOne({name: veggie});
    res.json(response);
})

app.listen(5000, () => {
    console.log("Server is listening on 5000");
})