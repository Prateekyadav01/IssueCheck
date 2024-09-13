import { Link, useNavigate } from "react-router-dom";
import { FaCartPlus, FaBars } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/storeSlices";
import { useState } from "react";

const Header = () => {
  const user = useSelector((state) => state?.user?.value);
  const cartProductCount = useSelector(
    (state) => state.user.cartProductCount || 0
  );
  const dispatch = useDispatch();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch("https://zsshop.onrender.com/api/userLogOut", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Logout successful!");
        dispatch(setUser(null));
        window.location.href = "/login";
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (e) {
      toast.error("An error occurred while logging out.");
      console.error("Logout error:", e);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchText = (e) => {
    const { value } = e.target;
    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <div className="bg-blue-600 max-w-screen-2xl container mx-auto md:px-20 px-8 h-16">
      <div className="navbar flex items-center justify-between h-full">
        <div className="navbar-start flex items-center">
          <Link
            to="/"
            className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-gray-800 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 text-black"
            >
              <path d="M3 12l9-9 9 9-9 9-9-9z" />
            </svg>
            <span className="text-2xl font-extrabold text-black">ZSshop</span>
          </Link>
        </div>
        {/* Search Bar - Visible only on larger screens */}
        <div className="navbar-center flex-1 mx-4 hidden md:flex">
          <div className="relative mx-auto w-full max-w-xs transition-all duration-300">
            <label className="px-3 py-1 border rounded-md flex items-center gap-2 bg-gray-100">
              <input
                type="text"
                className="grow outline-none bg-gray-100"
                placeholder="Search"
                onChange={handleSearchText}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
            </label>
          </div>
        </div>

        <div className="navbar-end flex items-center space-x-4">
          <div className="md:hidden">
            <FaBars
              className="h-6 w-6 text-gray-200 cursor-pointer"
              onClick={toggleMenu}
            />
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <div className="relative inline-block">
              {/* Cart is always shown */}
              <Link to="/addToCart">
                <FaCartPlus className="h-6 w-6 text-gray-200 cursor-pointer" />
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartProductCount || 0}
                </span>
              </Link>
            </div>

            <div className="relative">
              <CgProfile
                className="h-5 w-5 cursor-pointer text-gray-200"
                onClick={toggleDropdown}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black border rounded-lg shadow-lg z-50">
                  {/* Admin and Profile links are always shown */}
                  <Link
                    to="/admin/*"
                    className="block px-4 py-2 text-gray-100 hover:bg-gray-800"
                    onClick={() => {
                      setDropdownOpen(false);
                      toast.info("Navigating to Admin Portal...");
                    }}
                  >
                    Admin Portal
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-100 hover:bg-gray-800"
                    onClick={() => {
                      setDropdownOpen(false);
                      toast.info("Navigating to Profile...");
                    }}
                  >
                    User Profile
                  </Link>
                  {user && (
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-100 hover:bg-gray-800"
                    >
                      Logout
                    </button>
                  )}
                  {!user && (
                    <Link
                      to="/login"
                      className="block w-full text-left px-4 py-2 text-gray-100 hover:bg-gray-800"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Login
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden bg-black shadow-lg rounded-lg py-4 z-50 fixed top-16 left-0 right-0"
          style={{ zIndex: 9999 }} // Inline style for higher z-index
        >
          <div className="flex flex-col items-start space-y-2 px-4">
            <Link
              to="/addToCart"
              className="flex items-center space-x-2 text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <FaCartPlus className="h-5 w-5" />
              <span>Cart ({cartProductCount || 0})</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 text-gray-100"
              onClick={() => setMenuOpen(false)}
            >
              <CgProfile className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            {user ? (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-100"
              >
                <span>Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-black text-white p-2 m-2 rounded hover:bg-slate-800 duration-300 cursor-pointer w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
