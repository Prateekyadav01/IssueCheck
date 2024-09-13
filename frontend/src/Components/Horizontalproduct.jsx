/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import fetchCategoryWiseProduct from "../Helper/FetchCatagoryWiseProduct";
import displayINRCurrency from "../Components/displayINRCurrency";
import addToCart from "../Helper/AddtoCart";
import { Link } from "react-router-dom";

const HorizontalProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const loadingList = new Array(12).fill(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const product = await fetchCategoryWiseProduct(category);
      setData(Array.isArray(product?.data) ? product.data : []); // Ensure data is set as an array
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className="w-full px-4 py-4">
      <h2 className="text-2xl font-semibold mb-4">{heading}</h2>
      <div className="flex flex-wrap gap-4 justify-start">
        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="w-40 h-56 bg-gray-200 animate-pulse"
            ></div>
          ))
        ) : data.length > 0 ? (
          data.map((product) => (
            <div
              key={product._id}
              className="w-40 bg-white shadow-lg border border-gray-300 p-4 hover:border-red-600 transform hover:-translate-y-1 hover:shadow-xl transition duration-300"
            >
              <Link to={"/product/" + product._id}   onClick={()=>window.scroll({top:0 , behavior:"smooth" })}>
                <div className="h-28 bg-gray-100 flex justify-center items-center overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.productName}
                    className="object-cover h-24 w-24 transform transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="font-medium text-md text-gray-900 line-clamp-1">
                    {product.productName}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">
                    {product.brandName}
                  </p>
                </div>
              </Link>
              <div className="flex justify-between items-center mt-2">
                <p className="text-red-600 text-xs font-bold">
                  {displayINRCurrency(product.selling)}
                </p>
                <p className="text-gray-500 text-xs line-through">
                  {displayINRCurrency(product.price)}
                </p>
              </div>
              <button
                className="mt-2 w-full bg-red-600 hover:bg-red-700 text-white py-1 rounded-full transition-colors duration-300"
                onClick={(e) => {
                  addToCart(e, product._id); // Pass the event and productId to the function
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found for this category.</p>
        )}
      </div>
    </div>
  );
};

export default HorizontalProduct;
