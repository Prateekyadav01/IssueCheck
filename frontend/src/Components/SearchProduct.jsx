import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import displayINRCurrency from "../Components/displayINRCurrency";
import addToCart from "../Helper/AddtoCart";

const SearchProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const params = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const searchQuery = new URLSearchParams(params.search).get("q") || "";

      try {
        const response = await fetch(`https://zsshop.onrender.com/api/searchProduct`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Client-side filtering based on productName
        const filtered = data.data.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setProducts(filtered);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [params.search]);

  useEffect(() => {
    // Apply sorting, price, and category filtering
    let updatedProducts = [...products];

    // Sort products
    if (sortOption === "lowToHigh") {
      updatedProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === "highToLow") {
      updatedProducts.sort((a, b) => b.price - a.price);
    }

    // Apply price filter
    if (priceFilter === "above10000") {
      updatedProducts = updatedProducts.filter((product) => product.price > 10000);
    } else if (priceFilter === "above20k") {
      updatedProducts = updatedProducts.filter((product) => product.price > 20000);
    } else if (priceFilter === "above30k") {
      updatedProducts = updatedProducts.filter((product) => product.price > 30000);
    }

    // Apply category filter
    if (categoryFilter) {
      updatedProducts = updatedProducts.filter((product) =>
        product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    setFilteredProducts(updatedProducts);
  }, [sortOption, priceFilter, categoryFilter, products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex w-full px-4 py-4">
      <aside className="w-1/4 bg-white shadow-md rounded-md p-4 border border-gray-200 h-full">
        <h2 className="text-xl font-semibold mb-4 border-b pb-2 border-gray-300">Filter by Price</h2>
        <div className="mb-4">
          <h3 className="font-medium text-lg mb-2">Sort By</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="sort"
                value="lowToHigh"
                checked={sortOption === "lowToHigh"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              Low to High
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="sort"
                value="highToLow"
                checked={sortOption === "highToLow"}
                onChange={(e) => setSortOption(e.target.value)}
                className="mr-2"
              />
              High to Low
            </label>
          </div>
        </div>

        <div className="mb-4">
          <h3 className="font-medium text-lg mb-2">Price Range</h3>
          <div className="flex flex-col space-y-2">
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="above10000"
                checked={priceFilter === "above10000"}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="mr-2"
              />
              Above ₹10,000
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="above20k"
                checked={priceFilter === "above20k"}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="mr-2"
              />
              Above ₹20,000
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="price"
                value="above30k"
                checked={priceFilter === "above30k"}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="mr-2"
              />
              Above ₹30,000
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-lg mb-2">Category</h3>
          <div className="flex flex-col space-y-2">
            {["Airpods", "Camera", "Earphone", "Mobile", "Mouse", "Printer", "Processor", "Refrigerator", "Speaker", "Trimmer", "T-Shirt", "Watch", "TV"].map((category) => (
              <label className="flex items-center" key={category}>
                <input
                  type="radio"
                  name="category"
                  value={category.toLowerCase()}
                  checked={categoryFilter === category.toLowerCase()}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="mr-2"
                />
                {category}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <main className="w-3/4 pl-4">
        <h1 className="text-2xl font-semibold mb-4">Search Results</h1>
        <div className="flex flex-wrap gap-4 justify-start">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="w-40 bg-white shadow-lg border border-gray-300 p-4 hover:border-red-600 transform hover:-translate-y-1 hover:shadow-xl transition duration-300 rounded-md"
              >
                <Link to={"/product/" + product._id}>
                  <div className="h-28 bg-gray-100 flex justify-center items-center overflow-hidden rounded-md">
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
                    addToCart(e, product._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default SearchProduct;
