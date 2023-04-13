const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')
const app = express();
PORT = 3000;


// middleware------------------------
app.use(express.json());
//if you want to send the data like in the format of form, instead of json then you can use this middleware
app.use(express.urlencoded({extended : false}))


//routes--------------------------
app.get('/', (req,res) => {
    res.send('Hello Rest');
})

app.get('/blog',(req,res) => {
    res.send('Hello Blog');
})
// how to get/read the data from the database
app.get('/product', async(req, res) => {
    try{
        const products = await Product.find({}); //{empty curley braces means it will find all the data}
        res.status(200).json(products);
    } catch(error){
        res.status(500).json({message : error.message});
    }
})
// for the single product
// you need id as well
app.get('/product/:id', async(req, res) => {
    try{
        const{id} = req.params;
        //this is how you will get id
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message : error.message});
    }
})
// -------------------------------------------------------------
// create/storing the data in the database
app.post('/product', async(req, res) => {
    // console.log(req.body);
    // res.send(req.body);
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch(error){
        console.log(error.message);
        res.status(500).json({message : error.message});
    }
})
// ---------------------------------------------------------
// update or edit the data in the database

app.put('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // we can't find any product in database
        if(!product){
            return res.status(404).json({message : `can't find any product with id ${id} `});
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message : error.message});
    }
})
// ---------------------------------------------------------------
//remove or delete the data from the database
app.delete('/product/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.send(404).json({message : `can't find any product with id ${id} `});
        }
        res.status(200).json(product);
    } catch(error){
        res.status(500).json({message : error.message});
    }
})
//-----------------------------------------------------------------
//connect app with the database MONGODB
mongoose.connect(`mongodb://${process.env.db_username}:${process.env.db_password}@ac-9d7nftr-shard-00-00.rczoqnd.mongodb.net:27017,ac-9d7nftr-shard-00-01.rczoqnd.mongodb.net:27017,ac-9d7nftr-shard-00-02.rczoqnd.mongodb.net:27017/Cluster0?ssl=true&replicaSet=atlas-7wup0e-shard-0&authSource=admin&retryWrites=true&w=majority`)
.then( () => {
    app.listen(PORT, ()=> {
        console.log(`Server is running on port ${PORT} `)
    })
    console.log("Connected to MongoDB");
}).catch( (error) => {
    console.log("some error while connecting to the db", error);
})




