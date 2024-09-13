import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import Users from './Users';
// import Setting from './Setting'; // Ensure the correct import
import { useSelector } from 'react-redux';
import AllProducts from './AllProducts';

const AdminPortal = () => {
  const user = useSelector((state) => state?.user?.value);
  console.log(user);

  // Ensure user is an object and has data
  const userName = user && user.data ? user.data.name : 'User';

  return (
    <div className="flex flex-col md:flex-row h-auto">
      {/* Aside section */}
      <aside className="w-full md:w-1/4 bg-blue-900 text-white p-5 flex-shrink-0">
        <div className="mb-8">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
          <h2 className="text-center text-xl mt-4 font-bold">{userName}</h2>
        </div>

        <nav>
          <ul className="space-y-2">
            <li>
              <Link to="dashboard" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="users" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                Users
              </Link>
            </li>
            <li>
              <Link to="products" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
                All Products
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content area */}
      <main className="flex-1 bg-white p-5">
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="*" element={<Dashboard />} /> {/* Default route */}
        </Routes>
      </main>
    </div>
  );
};

export default AdminPortal;
