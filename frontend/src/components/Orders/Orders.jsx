import { Bell, Clock, Eye, MapPin, Phone } from "lucide-react";
import React, { useState } from "react";
import "./Orders.css";

const dummyOrders = [
  {
    id: "ORD-001",
    customerName: "Rajesh Kumar",
    status: "Preparing",
    statusColor: "#ffe066",
    statusTextColor: "#856404",
    progress: 25,
    items: [
      { name: "Fresh Tomatoes (5kg)", price: 225 },
      { name: "Onions (3kg)", price: 96 },
    ],
    total: 321,
    orderTime: "10:30 AM",
    deliveryTime: "12:00 PM",
    address: "123 Market Street, Pune",
    phone: "+91 98765 43210",
  },
  {
    id: "ORD-002",
    customerName: "Priya Sharma",
    status: "Ready for Pickup",
    statusColor: "#e3f0ff",
    statusTextColor: "#1976d2",
    progress: 75,
    items: [
      { name: "Bell Peppers (2kg)", price: 170 },
      { name: "Carrots (4kg)", price: 208 },
    ],
    total: 378,
    orderTime: "11:15 AM",
    deliveryTime: "1:30 PM",
    address: "456 Garden Road, Mumbai",
    phone: "+91 87654 32109",
  },
];

export default function Orders() {
  const [tab, setTab] = useState("current");
  const orders = dummyOrders; // Only current orders for now

  const handleCall = (phoneNumber) => {
    // Open phone dialer
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleDetails = (order) => {
    // Show order details
    const details = `
Order Details:
Customer: ${order.customerName}
Order ID: ${order.id}
Status: ${order.status}
Progress: ${order.progress}%
Items: ${order.items.map(item => `${item.name} (₹${item.price})`).join(', ')}
Total: ₹${order.total}
Order Time: ${order.orderTime}
Delivery Time: ${order.deliveryTime}
Address: ${order.address}
Phone: ${order.phone}
    `;
    alert(details);
  };

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h2 className="orders-title">Orders</h2>
        <Bell size={24} className="notification-icon" />
      </div>
      <div className="orders-tabs">
        <button
          className={`orders-tab ${tab === "current" ? "active" : ""}`}
          onClick={() => setTab("current")}
        >
          Current Orders ({orders.length})
        </button>
        <button
          className={`orders-tab ${tab === "history" ? "active" : ""}`}
          onClick={() => setTab("history")}
        >
          Order History
        </button>
      </div>
      {tab === "current" && (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card-adv" key={order.id}>
              <div className="order-header">
                <div className="order-customer-info">
                  <span className="order-customer">{order.customerName}</span>
                  <span className="order-id">Order #{order.id}</span>
                </div>
                <span className="order-status" style={{background: order.statusColor, color: order.statusTextColor}}>{order.status}</span>
              </div>
              <div className="order-progress">
                <div className="order-progress-bar-bg">
                  <div className="order-progress-bar" style={{width: `${order.progress}%`}}></div>
                </div>
                <span className="order-progress-text">{order.progress}%</span>
              </div>
              <div className="order-section">
                <div className="order-section-title">Items</div>
                <ul className="order-items-list">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="order-item-row">
                      <span>{item.name}</span>
                      <span>₹{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-section">
                <div className="order-section-title">Total</div>
                <div className="order-total">₹{order.total}</div>
              </div>
              <div className="order-details-row">
                <div className="order-detail-item">
                  <Clock size={16} />
                  <span>Ordered: {order.orderTime} | Delivery: {order.deliveryTime}</span>
                </div>
                <div className="order-detail-item">
                  <MapPin size={16} />
                  <span>{order.address}</span>
                </div>
                <div className="order-detail-item">
                  <Phone size={16} />
                  <span>{order.phone}</span>
                </div>
              </div>
              <div className="order-actions">
                <button 
                  className="order-action-btn"
                  onClick={() => handleCall(order.phone)}
                >
                  Call
                </button>
                <button 
                  className="order-action-btn details"
                  onClick={() => handleDetails(order)}
                >
                  <Eye size={16} />
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {tab === "history" && (
        <div className="orders-list empty">No order history yet.</div>
      )}
    </div>
  );
} 