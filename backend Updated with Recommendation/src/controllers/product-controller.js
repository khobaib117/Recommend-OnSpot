const Product = require("../models/product");
const Favourite = require("../models/favourite");
const Event = require('../models/event');
const Category = require('../models/category')
const fetch = require('node-fetch');

exports.getProductsBySlug = (req, res) => {

    const {slug} = req.params

    Event.findOne({event: slug})
    .exec((err, eventType) =>{
        if(err) return res.status(400).json({message: err});
        if(eventType){

            Product.find({event: eventType._id})
            .exec((error, products) => {
                if (error) return res.status(400).json({ error });
                if(products){
                    return res.status(200).json({ products });
                }
            });

        }
    });
};

exports.getProductsByGenderAndEvent = (req, res) => {

    const {cat, event} = req.params

    Category.findOne({name: cat})
    .exec((error, category) =>{
        if(error) return res.status(400).json({error});
        if(category){
            Event.findOne({event: event})
            .exec((err, eventType) =>{
                if(err) return res.status(400).json({message: err});
                if(eventType){

                    Product.find({
                        event: eventType._id,
                        category: category._id
                    })
                    .exec((error, products) => {
                        if (error) return res.status(400).json({ error });
                        if(products){
                            return res.status(200).json({ products });
                        }
                    });
                }
            });
        }
    });
};

exports.searchProductByImage = (req, res)=>{

    console.log(`${process.env.API}/public/${req.file.filename}`)
    // res.status(200).json({file: req.file, body: req.body});

    const image = req.file.path;
    const imagePath = `${image}@`

    fetch("http://127.0.0.1:5000/", {method: 'POST', body:imagePath})
    .then(response => response.json())
    .then(data => {
        
        const matchedImagesList = data.images;
        console.log(matchedImagesList)

        titlesList =[];
        var i;
        for(i =0; i<matchedImagesList.length; i++){
            matchedImagesList[i] = matchedImagesList[i].split(".")[0];
            // console.log(titlesList[i])
        }
        console.log(matchedImagesList)

        Product.find({
            title: {"$in": matchedImagesList}
        })
        .exec((error, products) =>{
            if(error) return res.status(400).json({error});
            if(products){
                console.log(products);
                return res.status(200).json({suggestedProducts: products})
            }
        });
    });
};




// Get Products by category
exports.getProductsByCategory = (req, res) => {

    const categoryName = req.query.categoryName;

    console.log("incomming categoryName ",categoryName)
  
    Category.findOne({name: categoryName})
    .exec((error, category) =>{
        if(error) return res.status(400).json({error});
        if(category){
            const categoryId = category._id;

            Product.find({category: categoryId})
            .exec((err, products) =>{
                if(err) return res.status(400).json({message: err});
                if(products){
                 res.send({data:products})
                }
            });
        }
    });
   



    
};



// Get All Products
exports.getAllProducts= (req, res) => {


    Product.find({})
    .exec((err, products) =>{
        if(err) return res.status(400).json({message: err});
        if(products){
         res.send({data:products})
        }
    });
   

    
};


// Get User Fav Products
exports.getUserFavProducts= (req, res) => {


    const email = req.query.email;

    console.log("incoming email",email)

    Favourite.find({email})
    .exec((err, products) =>{
        if(err) return res.status(400).json({message: err});
        if(products){
         res.send({data:products})
        }
    });
   

    
};



// add fav  Products
exports.addFavProducts = async (req, res) => {

    console.log("incoming fav req body",req.body)

    const email = req.body.email;
    const id = req.body._id;

    console.log("incoming userId req body",req.body.email)

    console.log("incoming productId req body",id)

    try {

         // Already Added check 
    const found =  await Favourite.findOne({productId:id,email})

    if(found){

        res.status(200).json({message:"Product Alread added to Favourite list",code:1});
 
    }
    else{

        const favouriteProduct = new Favourite({

            email : req.body.email,
            productId: id,
            title: req.body.title,
            imageLink: req.body.imageLink,
            productLink:  req.body.productLink,
            price: req.body.price,
            brand: req.body.brand,
            category: req.body.category,
            event: req.body.event

          });

        const response = favouriteProduct.save();

         res.send({code:0, message:"successfully Added to Favourite List"})
         
    }
    
       
      }
      catch(err) {
        res.send({code:-1,error:"error occured possible cause can be"+err.message});
      }
    




    
   
};



// delete fav  Products
exports.deleteFavProducts = async (req, res) => {

   
    
    const email = req.body.email;
    const productId = req.body.productId;


    try {

         // Delete Product
        const response =  await Favourite.deleteOne({productId,email})
         res.send({code:0,data:response})

       
      }
      catch(err) {
        res.send({code:-1,error:"error occured possible cause can be"+err.message});
      }
   
};




//  Get all Products Categories
exports.productsCategories = async (req, res) => {

    Category.find({})
    .exec((err, categories) =>{
        if(err) return res.status(400).json({message: err});
        if(categories){
         res.send({data:categories})
        }
    });
   
   
};


//  Get all Products Categories
exports.productsEvents = async (req, res) => {


    Event.find({})
    .exec((err, event) =>{
        if(err) return res.status(400).json({message: err});
        if(event){
         res.send({data:event})
        }
    });
   
   
};




