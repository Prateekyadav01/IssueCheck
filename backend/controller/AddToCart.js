const addToCartModel = require("../model/CartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productId } = req.body;
    const currentUser = req.user?.id; // Access the user ID from the middleware

    if (!currentUser) {
      return res.status(401).json({
        message: "User ID not found",
        success: false,
        error: true,
      });
    }

    const isProductAvailable = await addToCartModel.findOne({
      productId: productId,
      userId: currentUser,
    });


    if (isProductAvailable) {
      return res.json({
        message: "Product already exists in the cart",
        success: false,
        error: true,
      });
    }

    const payload = {
      productId: productId,
      quantity: 1,
      userId: currentUser,
      data:[]
    };

    const newAddToCart = new addToCartModel(payload);
    const saveProduct = await newAddToCart.save();

    return res.json({
      data: saveProduct,
      message: "Product added to cart successfully",
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "Error adding product to cart",
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
