import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const CategoryData = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const categoryLoading = new Array(13).fill(null);
  const fetchCategoryProduct = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://zsshop.onrender.com/api/getAllCatagoryProduct"
      );
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse.data);
    } catch (error) {
      console.error("Failed to fetch category products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center flex-wrap gap-4 justify-between scrollbar-hide">
        {loading
          ? categoryLoading.map((_, index) => (
              <div
                className="h-14 w-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-slate-200 animate-pulse"
                key={"categoryLoading" + index}
              ></div>
            ))
          : categoryProduct.map((product, index) => (
              <Link
                to={"/catagoryProducts/" + product?.category}
                className="cursor-pointer "
                onClick={()=>window.scroll({top:0 , behavior:"smooth"})}
                key={product._id}
              >
                <div   onClick={()=>window.scroll({top:0 , behavior:"smooth"})} className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center ">
                  {product.images && product.images.length > 0 ? (
                    <img
                      src={product.images[0]}
                      alt={product.category}
                      className="h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all"
                    />
                  ) : (
                    <div className="text-gray-500">No Image</div>
                  )}
                </div>
                <p className="text-center text-sm md:text-base capitalize">
                  {product.category}
                </p>
              </Link>
            ))}
      </div>
    </div>
  );
};

export default CategoryData;
