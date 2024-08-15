import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../styles/admin.css";

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/orders')
            .then(response => {
                setOrders(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the orders!', error);
            });
    }, []);

    return (
        <div className="dashboard-container">
        <h2>Admin Dashboard</h2>
        <table className="order-table">
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                {orders.map(order => (
                    <tr key={order._id}>
                        <td>{order._id}</td>
                        <td>{order.name}</td>
                        <td>{'\u20B9'} {order.price}</td>
                        <td>{order.quantity}</td>
                        <td>{'\u20B9'} {order.total}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    );
};

export default AdminDashboard;
