const addToCartModel = require("../model/CartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const currentUserId = req.user?.id;
    const addToCartProductId = req.body._id;
    const qty = req.body.quantity;

    const updateProduct = await addToCartModel.findOneAndUpdate(
      { _id: addToCartProductId, userId: currentUserId }, // Ensure it matches the user's cart item
      { quantity: qty }, // Directly update the quantity
      { new: true } // Return the updated document
    );

    if (!updateProduct) {
      return res.json({
        message: "Product not found or you're not authorized",
        error: true,
        success: false,
      });
    }

    res.json({
      message: "Product Updated",
      data: updateProduct,
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err?.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = updateAddToCartProduct;
