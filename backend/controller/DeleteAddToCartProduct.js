const addToCartModel = require("../model/CartProduct");

const deleteAddToCartProduct = async (req, res) => {
    try {
        const currentUserId = req.user?.id;
        const addToCartProductId = req.body._id;
        const deleteProduct = await addToCartModel.deleteOne({
            _id: addToCartProductId,
            userId: currentUserId,
        });

        if (deleteProduct.deletedCount === 0) {
            return res.json({
                message: "Product not found or not owned by user",
                error: true,
                success: false,
            });
        }

        res.json({
            message: "Product Deleted From Cart",
            error: false,
            success: true,
            data: deleteProduct,
        });

    } catch (err) {
        res.json({
            message: err?.message || err,
            error: true,
            success: false,
        });
    }
};

module.exports = deleteAddToCartProduct;
