import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const AddToCartProduct = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const user = useSelector((state) => state?.user?.value);

  const fetchCartProducts = async () => {
    if (!user) return;

    try {
      const response = await fetch('https://zsshop.onrender.com/api/cartProductview', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setCartProducts(data.data);
      } else {
        toast.error('Failed to fetch cart products: ' + data.message);
      }
    } catch (error) {
      toast.error('Error fetching cart products: ' + error.message);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, [user]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch('https://zsshop.onrender.com/api/updateAddToCartProduct', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ _id: productId, quantity: newQuantity }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCartProducts((prevProducts) =>
          prevProducts.map((item) =>
            item._id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      } else {
        toast.error('Failed to update quantity: ' + data.message);
      }
    } catch (error) {
      toast.error('Error updating quantity: ' + error.message);
    }
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await fetch('https://zsshop.onrender.com/api/deleteAddToCartProduct', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({ _id: productId }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setCartProducts((prevProducts) =>
          prevProducts.filter((item) => item._id !== productId)
        );
        toast.success('Product removed from cart');
      } else {
        toast.error('Failed to remove product: ' + data.message);
      }
    } catch (error) {
      toast.error('Error removing product: ' + error.message);
    }
  };

  // Calculate total amount and item count
  const totalAmount = cartProducts.reduce((total, item) => total + item.productId.price * item.quantity, 0);
  const totalItems = cartProducts.length;

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row bg-gray-100 rounded-lg shadow-lg">
      {/* Left Side: Cart Products List */}
      <div className="flex-1 pr-2 mb-4 md:mb-0">
        <h2 className="text-2xl font-bold mb-6">Your Cart</h2>
        {cartProducts.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartProducts.map((item) => (
              <div
                key={item._id}
                className="flex items-center border p-3 rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Product Image */}
                {item.productId.images.length > 0 && (
                  <img
                    src={item.productId.images[0]} // Use the first image URL
                    alt={item.productId.productName}
                    className="w-24 h-24 object-cover mr-4 rounded-md border border-gray-200"
                  />
                )}
                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">{item.productId.productName}</h3>
                  <p className="text-gray-600 text-sm mb-1">{item.productId.brandName}</p>
                  <p className="text-red-600 font-bold mb-2">${item.productId.price}</p>
                  <div className="flex items-center mb-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                      -
                    </button>
                    <p className="mx-2 text-lg">{item.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="bg-gray-300 text-gray-800 px-2 py-1 rounded hover:bg-gray-400 transition-colors duration-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveProduct(item._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors duration-300"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Side: Summary */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Summary</h2>
        <div className="text-lg mb-4">
          <p className="flex justify-between text-gray-700 mb-2">
            <span>Total Items:</span> <span>{totalItems}</span>
          </p>
          <p className="flex justify-between text-gray-700">
            <span>Total Amount:</span> <span>${totalAmount.toFixed(2)}</span>
          </p>
        </div>
        <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-500 transition-colors duration-300 text-lg">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default AddToCartProduct;
