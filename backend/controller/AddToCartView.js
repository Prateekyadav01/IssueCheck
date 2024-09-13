const AddToCartModel = require('../model/CartProduct'); // Adjust path if necessary

const addToCartProductView = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                message: "User ID not found",
                data: [],
                success: false,
                error: true
            });
        }

        // Fetch all cart products for the current user and populate product details
        const allProducts = await AddToCartModel.find({ userId })
            .populate('productId') // Populate product details from Product model
            .exec();

        res.json({
            message: "",
            data: allProducts,
            success: true,
            error: false
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: true,
            message: 'Error fetching cart products'
        });
    }
};

module.exports = addToCartProductView;
