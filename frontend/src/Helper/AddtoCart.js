
import { toast } from 'react-toastify'



const addToCart = async (e, id) => {
    try {
      // Fetch existing cart items to check if the item is already present
      const cartResponse = await fetch("https://zsshop.onrender.com/api/cartProductview", {
        method: "GET",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
      });
  
      const cartData = await cartResponse.json();
      if (!cartData.success) {
        throw new Error(cartData.message);
      }
  
      const existingItem = cartData.data.find(item => item.productId === id);
  
      if (existingItem) {
        toast.info("Product already in cart.");
        return;
      }
      const response = await fetch("https://zsshop.onrender.com/addToCartProduct", {
        method: "POST",
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
  
      const responseData = await response.json();
  
      if (responseData.success) {
        toast.success(responseData.message);
      }
  
      if (responseData.error) {
        toast.error(responseData.message);
      }
  
      return responseData;
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Something went wrong while adding the product to cart.");
    }
  };
  
  export default addToCart