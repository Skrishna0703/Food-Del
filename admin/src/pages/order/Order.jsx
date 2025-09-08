import React, { useState, useEffect } from 'react';
import './Order.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/order/list`, {
        params: { page, limit, search }
      });
      if (response.data.success) {
        setOrders(response.data.orders);
        setTotal(response.data.total);
        setTotalPages(response.data.pages);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("Failed to fetch orders.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const response = await axios.post(`${url}/api/order/update-status`, { orderId, status });
      if (response.data.success) {
        toast.success("Status updated");
        fetchOrders(); // Refresh list
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Failed to update status.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, search]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by user name or email..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="orders-table">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Items</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.userId ? `${order.userId.name} (${order.userId.email})` : 'N/A'}</td>
                    <td>{order.items.map(item => `${item.name} x${item.quantity}`).join(', ')}</td>
                    <td>₹{order.amount}</td>
                    <td>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Food Processing">Food Processing</option>
                        <option value="Out for delivery">Out for delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>
                      {/* Add more actions if needed */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="pagination">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
          <p>Total Orders: {total}</p>
        </>
      )}
    </div>
  );
};

export default Order;
