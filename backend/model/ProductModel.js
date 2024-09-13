const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    productName: {
        type: String,
       
    },
    brandName: {
        type: String,
        
    },
    category: {
        type: String,
        
    },
    images: [String], // Use `String` to store URLs of images
    price: {
        type: Number,
       
    },
    selling: {
        type: Number,
       
    },
});

const ProductModel = mongoose.models.Product || mongoose.model('Product', ProductSchema);

module.exports = ProductModel;
