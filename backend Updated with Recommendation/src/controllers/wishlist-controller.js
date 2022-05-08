const Wishlist = require("../models/wishlist");
const Product = require('../models/product');

exports.addItemToWishlist = (req, res) =>{

    Wishlist.findOne({user: req.user._id})
    .exec((err, wishlist) =>{
        if(err) return res.status(400).json({err});
        if(wishlist){
            // user has already a wishlist, so update items

            const _product = req.body.wishlistItems.product;    // product to add in wishlist
            // find product in user wishlist, if exist before or not
            const product = wishlist.wishlistItems.find(p => p.product == _product);

            if(product){
                // product already in wishlist
                return res.status(409).json({message:"Already in wishlist"});
            }else{
                // add product to the user's wishlist items
                Wishlist.findOneAndUpdate({user: req.user._id},{
                    "$push":{
                        "wishlistItems": req.body.wishlistItems
                    }
                }).exec((error, _wishlist) =>{
                    if(error) return res.status(400).json({err});
                    if(_wishlist){
                        return res.status(201).json({wishlist: _wishlist});
                    }
                });

                return res.status(200).json({message: wishlist});
            }
            
        }else{
            //Create a new wishlist for user and add product into it
            const wishlist = new Wishlist({
                user: req.user._id,
                wishlistItems: [req.body.wishlistItems]
            });
        
            wishlist.save((error, wishlist)=>{
                if(error) return res.status(400).json({error});
                if(wishlist){
                    return res.status(201).json({wishlist: wishlist});
                }
            });
        }
    });
};


exports.getWishlistItems = (req, res) => {
    Wishlist.findOne({user: req.user._id})
    .exec((err, wishlist) =>{
        if(err) return res.status(400).json({err});

        if(wishlist){
            const products = wishlist.wishlistItems;
            var productIds = [];
            for(i in products){
                wishlistProduct = products[i];
                productIds.push(wishlistProduct.product)
            }

            console.log(productIds);

            Product.find({
                _id: {"$in": productIds}
            })
            .exec((error, products) =>{
                if(error) return res.status(400).json({error});
                if(products){
                    //console.log(product);
                    return res.status(200).json({wishlist: products})
                }
            });
        }
    });
}