import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h2 className="text-lg font-bold mb-4">About Us</h2>
            <p className="text-sm">
              Welcome to our e-commerce store! We offer a wide range of products to meet all your needs. Our mission is to provide the best shopping experience for our customers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-bold mb-4">Quick Links</h2>
            <ul className="text-sm space-y-2">
              <li><a href="/" className="hover:underline">Home</a></li>
              <li><a href="/shop" className="hover:underline">Shop</a></li>
              <li><a href="/about" className="hover:underline">About Us</a></li>
              <li><a href="/contact" className="hover:underline">Contact Us</a></li>
              <li><a href="/faq" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-lg font-bold mb-4">Contact Us</h2>
            <p className="text-sm">Shami Ahmad</p>
            <p className="text-sm">Email: contact@yourstore.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="text-white hover:text-gray-400">
                <FaFacebookF />
              </a>
              <a href="https://twitter.com" className="text-white hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" className="text-white hover:text-gray-400">
                <FaInstagram />
              </a>
              <a href="https://linkedin.com" className="text-white hover:text-gray-400">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mt-8">
          &copy; {new Date().getFullYear()} Shami Ahmad. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
