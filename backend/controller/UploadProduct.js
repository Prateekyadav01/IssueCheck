const ProductModel = require('../model/ProductModel');

const uploadProduct = async (req, res) => {
    try {
        // Log the request body to verify incoming data
        console.log('Request Body:', req.body);

        // Destructure data from request body
        const { productName, brandName, category, images, price, selling } = req.body;

        // Validate all required fields
        if (!productName || !brandName || !category || !images || !price || !selling) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        // Validate images to ensure it's an array
        if (!Array.isArray(images)) {
            return res.status(400).json({ success: false, message: 'Images must be an array.' });
        }

        // Create a new product instance
        const newProduct = new ProductModel({
            productName,
            brandName,
            category,
            images, // images should already be an array
            price: Number(price), // Ensure price is a number
            selling: Number(selling) // Ensure selling is a number
        });

        console.log(newProduct)

        // Save the product to the database
        const savedProduct = await newProduct.save();

        // Send response with success message and saved product data
        res.status(200).json({ success: true, data: savedProduct });
    } catch (error) {
        // Log error and send response with error message
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = uploadProduct;
