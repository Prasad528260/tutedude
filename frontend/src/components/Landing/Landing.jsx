import {
    ArrowRight,
    Bell,
    Clock,
    DollarSign,
    Package,
    Search,
    TrendingUp,
    Users
} from 'lucide-react';
import React, { useState } from 'react';
import './Landing.css';

const Landing = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data for dashboard
  const stats = [
    { title: "Total Orders", value: "156", icon: <Package />, color: "#3B82F6" },
    { title: "Active Vendors", value: "23", icon: <Users />, color: "#10B981" },
    { title: "Revenue", value: "₹45,230", icon: <DollarSign />, color: "#F59E0B" },
    { title: "Growth", value: "+12%", icon: <TrendingUp />, color: "#EF4444" },
  ];

  const recentOrders = [
    {
      id: "ORD-001",
      customer: "Rajesh Kumar",
      items: 3,
      total: "₹450",
      status: "Preparing",
      time: "2 min ago"
    },
    {
      id: "ORD-002", 
      customer: "Priya Sharma",
      items: 2,
      total: "₹320",
      status: "Ready",
      time: "5 min ago"
    },
    {
      id: "ORD-003",
      customer: "Amit Patel", 
      items: 4,
      total: "₹680",
      status: "Delivered",
      time: "15 min ago"
    }
  ];

  const quickActions = [
    { title: "View Orders", icon: <Package />, color: "#3B82F6" },
    { title: "Add Product", icon: <Plus />, color: "#10B981" },
    { title: "Analytics", icon: <TrendingUp />, color: "#F59E0B" },
    { title: "Settings", icon: <Settings />, color: "#8B5CF6" }
  ];

  return (
    <div className="landing-container with-bottom-nav-padding">
      {/* Header */}
      <div className="landing-header">
        <div className="header-left">
          <h1 className="welcome-text">Welcome back!</h1>
          <p className="subtitle">Here's what's happening today</p>
        </div>
        <div className="header-right">
          <button className="notification-btn">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="search-section">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products, vendors, or orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="stats-section">
        <h2 className="section-title">Overview</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-title">{stat.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h2 className="section-title">Quick Actions</h2>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button key={index} className="quick-action-card">
              <div className="action-icon" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                {action.icon}
              </div>
              <span className="action-title">{action.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="recent-orders-section">
        <div className="section-header">
          <h2 className="section-title">Recent Orders</h2>
          <button className="view-all-btn">
            View All
            <ArrowRight size={16} />
          </button>
        </div>
        <div className="orders-list">
          {recentOrders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3 className="order-id">{order.id}</h3>
                  <p className="order-customer">{order.customer}</p>
                </div>
                <div className="order-status">
                  <span className={`status-badge ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="order-details">
                <div className="order-meta">
                  <span className="order-items">{order.items} items</span>
                  <span className="order-total">{order.total}</span>
                </div>
                <div className="order-time">
                  <Clock size={14} />
                  <span>{order.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Missing icons
const Plus = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const Settings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1 1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

export default Landing;
