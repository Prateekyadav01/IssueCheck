import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [salesData, setSalesData] = useState(null);
  const [ordersData, setOrdersData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const salesResponse = await fetch('http://localhost:4000/api/sales');
        const ordersResponse = await fetch('http://localhost:4000/api/orders');
        const usersResponse = await fetch('http://localhost:4000/api/users');

        if (!salesResponse.ok || !ordersResponse.ok || !usersResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const sales = await salesResponse.json();
        const orders = await ordersResponse.json();
        const users = await usersResponse.json();

        setSalesData(sales.data);
        setOrdersData(orders.data);
        setUsersData(users.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <p className="text-lg text-gray-600 mb-6">Welcome to the dashboard! Here you can see an overview of your admin activities.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sales Summary */}
        <div className="bg-gradient-to-r from-blue-500 to-teal-400 p-6 rounded-md shadow-md text-white">
          <h2 className="text-lg font-semibold mb-4">Sales Overview</h2>
          <p className="text-xl">Total Sales: {salesData ? `$${salesData.totalSales}` : 'Loading...'}</p>
          <p className="text-xl">Monthly Sales: {salesData ? `$${salesData.monthlySales}` : 'Loading...'}</p>
        </div>
        
        {/* Orders Summary */}
        <div className="bg-gradient-to-r from-green-500 to-lime-400 p-6 rounded-md shadow-md text-white">
          <h2 className="text-lg font-semibold mb-4">Orders Overview</h2>
          <p className="text-xl">Total Orders: {ordersData ? ordersData.totalOrders : 'Loading...'}</p>
          <p className="text-xl">Pending Orders: {ordersData ? ordersData.pendingOrders : 'Loading...'}</p>
        </div>
        
        {/* Users Summary */}
        <div className="bg-gradient-to-r from-pink-500 to-red-400 p-6 rounded-md shadow-md text-white">
          <h2 className="text-lg font-semibold mb-4">Users Overview</h2>
          <p className="text-xl">Total Users: {usersData ? usersData.totalUsers : 'Loading...'}</p>
          <p className="text-xl">Active Users: {usersData ? usersData.activeUsers : 'Loading...'}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
