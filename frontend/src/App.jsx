import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./Components/Login";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import SignUpPage from "./Components/SignUpPage";
import Profile from "./Components/Profile";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { setUser, setCartProductCount } from "./redux/storeSlices";
import Home from "./Components/Home";
import AdminPortal from "./Components/AdminPortal";
import CatagoryProducts from "./Components/CatagoryProducts";
import ProductDetails from "./Components/ProductDetails";
import AddToCartProduct from "./Components/AddToCartProduct";
import SearchProduct from "./Components/SearchProduct";

function App() {
  const dispatch = useDispatch();

  const fetchUserAddToCart = async () => {
    try {
      const dataResponse = await fetch("https://zsshop.onrender.com/api/countProductItems", {
        method: "GET",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          },

      });

      const dataApi = await dataResponse.json();
      console.log(dataApi?.data?.count);

      // Dispatching cart product count to Redux
      dispatch(setCartProductCount(dataApi?.data?.count));
    } catch (error) {
      console.error('Error fetching cart product count:', error);
    }
  }

  const fetchUserDetails = async () => {
    try {
      const response = await fetch('https://zsshop.onrender.com/api/userDetail', {
        method: 'GET',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
        },
    });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      // Dispatching user details to Redux
      dispatch(setUser(data?.data));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <> <Header /> <Home /><Footer /> </>,
    },
    {
      path: "/login",
      element: <><Header /> <Login /> <Footer /> </>,
    },
    {
      path: "/signup",
      element: <><Header /> <SignUpPage /> <Footer /> </>,
    },
    {
      path: "/profile",
      element: <><Header /> <Profile /> <Footer /> </>,
    },
    {
      path: "/admin/*",
      element: <><Header /> <AdminPortal /> <Footer /> </>,
    },
    {
      path: "/catagoryProducts/:catagoryName",
      element: <><Header /> <CatagoryProducts /> <Footer /> </>,
    },
    {
      path: "/product/:id",
      element: <><Header /> <ProductDetails /> <Footer /> </>, 
    },
    {
      path: "/addToCart",
      element: <><Header /> <AddToCartProduct /> <Footer /> </>, 
    },
    {
      path: "/search",
      element: <><Header /> <SearchProduct /> <Footer /> </>, 
    },
  ]);

  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
