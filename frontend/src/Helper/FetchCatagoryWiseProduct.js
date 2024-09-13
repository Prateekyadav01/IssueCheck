const fetchCategoryWiseProduct = async (category) => {
    const response = await fetch("https://zsshop.onrender.com/api/catagoryWiseProduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: category,
      }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch category-wise products');
    }
  
    const dataResponse = await response.json();
    return dataResponse;
  };
  
  export default fetchCategoryWiseProduct;
  