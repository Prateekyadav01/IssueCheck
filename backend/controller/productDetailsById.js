const productModel = require("../model/ProductModel");

const productDetailsByid = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await productModel.findById(id);

    if (!product) {
      return res.json({
        success: false,
        status: 404,
        message: "Product not found",
        data: null,
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "Product details fetched successfully",
      data: product,
    });
  } catch (e) {
    res.json({
      message: e.message,
      success: false,
      error: true,
    });
  }
};

module.exports = productDetailsByid;
