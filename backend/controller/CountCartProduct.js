const addToCartModel = require("../model/CartProduct");

const countAddToCartProduct = async (req, res) => {
    try {
        const userId = req.user?.id; // Access the user ID from the middleware

        if (!userId) {
            return res.status(401).json({
                message: "User ID not found",
                error: true,
                success: false,
            });
        }

        const count = await addToCartModel.countDocuments({
            userId: userId
        });

        res.json({
            data: {
                count: count
            },
            message: "ok",
            error: false,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message || "Error counting cart products",
            error: true,
            success: false,
        });
    }
};

module.exports = countAddToCartProduct;
