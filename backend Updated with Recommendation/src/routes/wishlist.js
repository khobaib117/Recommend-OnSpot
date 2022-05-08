const express = require('express');
const { requireSignin } = require('../controllers/auth-controller');
const { addItemToWishlist, getWishlistItems } = require('../controllers/wishlist-controller');
const router = express.Router();

router.post("/user/wishlist/add-to-wishlist", requireSignin, addItemToWishlist);

router.get("/user/wishlist", requireSignin, getWishlistItems);

module.exports = router;