/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import uploadImage from "../Helper/uploadImage";
import DisplayImage from "./DisplayImage";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Modal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  const [selectedImage, setSelectedImage] = useState(null); // State to handle full-page image view

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const imageUploadCloudinary = await uploadImage(file);
        return imageUploadCloudinary.url;
      })
    );

    setFormData({
      ...formData,
      images: [...formData.images, ...uploadedImages],
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      
      if (!formData.productName || !formData.brandName || !formData.category || !formData.price || !formData.selling || !formData.images.length) {
        toast.error("All fields are required.");
        return;
      }
  
      const response = await fetch("https://zsshop.onrender.com/api/uploadProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData), 
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Product uploaded successfully:", data);
        toast.success("Product uploaded successfully!");
        onSubmit(); 
        window.location.reload()
        // Close the modal after successful submission
      } else {
        console.error("Failed to upload product:", data.message);
        toast.error("Failed to upload product");
      }
    } catch (error) {
      console.error("Error during product upload:", error);
      toast.error("Error during product upload");
    }
  };
  

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl); // Set the selected image for full-page view
  };

  const handleCloseImageView = () => {
    setSelectedImage(null); // Close the full-page image view
  };

  return (
    <div>
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md mx-4 sm:mx-0 overflow-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">Add Product</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Brand Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              >
                <option value="">Select a category</option>
                <option value="airpods">Airpods</option>
                <option value="camera">Camera</option>
                <option value="earphone">Earphone</option>
                <option value="trimmer">Trimmer</option>
                <option value="tv">TV</option>
                <option value="watch">Watch</option>
                <option value="clothes">Clothes</option>
                <option value="tshirts">T-Shirts</option>
                <option value="mobile">Mobile</option>
                <option value="mouse">Mouse</option>
                <option value="printer">Printer</option>
                <option value="processor">Processor</option>
                <option value="refrigerator">Refrigerator</option>
                <option value="speaker">Speaker</option>
                <option value="processor">laptop</option>
                <option value="refrigerator">men's</option>
                <option value="speaker">Electronics</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Product Images</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleFileChange}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="flex flex-wrap">
              {formData.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Product ${index}`}
                  className="w-16 h-16 object-cover mr-2 mb-2 cursor-pointer"
                  onClick={() => handleImageClick(image)} // Handle image click
                />
              ))}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Selling</label>
              <input
                type="number"
                name="selling"
                value={formData.selling}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                required
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Add Product
              </button>
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Full-Page Image View */}
      <DisplayImage imageUrl={selectedImage} onClose={handleCloseImageView} />
    </div>
  );
};
const AllProducts = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    productName: "",
    brandName: "",
    category: "",
    price: "",
    selling: "",
    images: [],
  });
  const [products, setProducts] = useState([]);

  // Fetch all products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/getAllProducts");
        const data = await response.json();
        if (response.ok) {
          setProducts(data);
        } else {
          toast.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Error fetching products");
      }
    };

    fetchProducts();
  }, []);

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmitProduct = async () => {
    console.log("Form data:", formData);
    handleCloseModal(); 
  };

  return (
    <div className="flex  flex-col md:flex-row h-[600px] overflow-y-auto">
    <div className="flex-1 p-4">
      <h1 className="text-3xl font-bold mb-4 border-b-2 border-gray-300 pb-2">
        All Products
      </h1>
      {/* Display the products */}
      <div className="  grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="transform transition-transform duration-300 hover:scale-105 hover:shadow-lg h-64 w-full border p-4 rounded-lg shadow-md bg-white flex flex-col justify-between cursor-pointer"
          >
            <img
              src={product.images[0]}
              alt={product.productName}
              className="w-full h-32 object-cover rounded-md"
            />
            <h2 className="text-lg font-bold mt-2">{product.productName}</h2>
            <p className="text-gray-600 font-semibold">
              Brand: {product.brandName}
            </p>
            <p className="text-gray-600 font-semibold">Price: ${product.price}</p>
            {/* <p className="text-gray-600">Selling: ${product.selling}</p> */}
          </div>
        ))}
      </div>
    </div>
    <div className="p-4">
      <button
        onClick={handleUploadClick}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Upload Product
      </button>
    </div>
    <Modal
      isOpen={isModalOpen}
      onClose={handleCloseModal}
      onSubmit={handleSubmitProduct}
      formData={formData}
      setFormData={setFormData}
    />
  </div>
  
  );
};

export default AllProducts;
