import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HorizontalProduct from "./Horizontalproduct";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    images: [],
    price: "",
    selling: "",
  });

  const [selectedImage, setSelectedImage] = useState("");
  const [rating, setRating] = useState(4);

  const params = useParams();

  const fetchProductById = async () => {
    try {
      const response = await fetch("https://zsshop.onrender.com/api/productDetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: params.id }),
      });

      const result = await response.json();

      if (result.success) {
        setData(result.data);
        setSelectedImage(result.data.images[0]);
      } else {
        console.error("Failed to fetch product details:", result.message);
      }
    } catch (error) {
      console.error("An error occurred while fetching product details:", error);
    }
  };

  useEffect(() => {
    fetchProductById();
  }, [params.id]);

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-5 h-5 sm:w-6 sm:h-6 ${i <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.518 4.675a1 1 0 00.95.69h4.905c.969 0 1.371 1.24.588 1.81l-3.973 2.884a1 1 0 00-.364 1.118l1.518 4.675c.3.921-.755 1.688-1.54 1.118l-3.973-2.884a1 1 0 00-1.175 0l-3.973 2.884c-.785.57-1.84-.197-1.54-1.118l1.518-4.675a1 1 0 00-.364-1.118L2.093 10.1c-.783-.57-.38-1.81.588-1.81h4.905a1 1 0 00.95-.69l1.518-4.675z" />
        </svg>
      );
    }
    return stars;
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start w-full">
          {/* Main Image */}
          <div className="w-full md:w-auto order-1 md:order-2 flex justify-center mb-4 md:mb-0">
            <img
              src={selectedImage}
              alt={data.productName}
              className="w-full h-64 md:w-96 md:h-96 object-cover border border-gray-300"
            />
          </div>

          {/* Small Images */}
          <div className="flex flex-row md:flex-col gap-2 md:gap-4 order-2 md:order-1 justify-center">
            {data.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={data.productName}
                className={`w-16 h-16 md:w-20 md:h-20 object-cover cursor-pointer border ${selectedImage === image ? 'border-red-600' : 'border-gray-300'}`}
                onMouseEnter={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:ml-8 flex flex-col gap-4 w-full md:w-auto mt-4 md:mt-0">
          {/* Product Details */}
          <div>
            <h2 className="text-xl md:text-2xl font-semibold mb-2">{data.productName}</h2>
            <p className="text-md md:text-lg text-gray-600 mb-2">
              <span className="font-semibold text-blue-600">{data.brandName}</span>
            </p>
            <p className="flex items-center mb-2">
              {renderStars()}
              <span className="ml-2 text-gray-600">(4/5)</span>
            </p>
            <p className="text-md md:text-lg text-gray-600">Category: {data.category}</p>
            <p className="text-md md:text-lg text-red-600 font-bold">Price: {data.selling}</p>
            <p className="text-md md:text-lg text-gray-500 line-through">MRP: {data.price}</p>
          </div>

          {/* Advertisement Section */}
          <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
            <h3 className="text-lg md:text-xl font-bold mb-2">Shop at ZS Shop!</h3>
            <p className="text-gray-700">
              Discover the latest deals and discounts on our wide range of products. Enjoy shopping with us and get fast delivery on every order!
            </p>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 md:px-6 rounded-full transition-colors duration-300">
              Add to Cart
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 md:px-6 rounded-full transition-colors duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <HorizontalProduct category={data.category} heading={"Recommended Products"} />
    </>
  );
};

export default ProductDetails;
