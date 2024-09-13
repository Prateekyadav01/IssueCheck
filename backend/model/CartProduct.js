const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema({
   productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Correct reference to Product model
        required: true
   },
   quantity: {
        type: Number,
        required: true, 
        min: 1 
   },
   userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true 
   }
}, {
    timestamps: true
});

const AddToCartModel = mongoose.model('AddToCart', addToCartSchema);

module.exports = AddToCartModel;
