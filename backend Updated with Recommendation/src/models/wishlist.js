const mongoose = require('mongoose')

const whishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    },

    wishlistItems: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref:'Product', required: true},
        }
    ]
});


module.exports = mongoose.model('wishlist', whishlistSchema);
