const ProductModel=require("../model/ProductModel")

const getAllProduct =async(req, res)=>{
    try{
        const products=await ProductModel.find();
        // console.log(products)
        res.json(products);
    }
    catch(e){
        res.json({
            status: false,
            message: e.message,
            error:true
        })
    }
}
module.exports=getAllProduct