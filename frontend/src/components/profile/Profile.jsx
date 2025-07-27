import {
    Bell,
    Camera,
    DollarSign,
    Edit,
    HelpCircle,
    LogOut,
    Mail,
    MapPin,
    Package,
    Phone,
    Settings,
    Shield,
    Star,
    TrendingUp,
    User
} from 'lucide-react';
import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    name: "Rajesh Kumar",
    email: "rajesh@gmail.com",
    phone: "+91 98765 43210",
    location: "Gurgaon, Haryana",
    avatar: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
    role: "Vendor",
    shopName: "Fresh Farm Produce",
    joinDate: "March 2024",
    rating: 4.8,
    totalOrders: 245,
    totalRevenue: "₹45,230"
  };

  const stats = [
    { label: "Total Orders", value: user.totalOrders, icon: <Package />, color: "#3B82F6" },
    { label: "Total Revenue", value: user.totalRevenue, icon: <DollarSign />, color: "#10B981" },
    { label: "Rating", value: user.rating, icon: <Star />, color: "#F59E0B" },
    { label: "Growth", value: "+12%", icon: <TrendingUp />, color: "#EF4444" }
  ];

  const menuItems = [
    { id: 'profile', label: 'Profile', icon: <User /> },
    { id: 'settings', label: 'Settings', icon: <Settings /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell /> },
    { id: 'security', label: 'Security', icon: <Shield /> },
    { id: 'help', label: 'Help & Support', icon: <HelpCircle /> }
  ];

  const recentActivity = [
    { type: 'order', message: 'New order received', time: '2 min ago', icon: <Package /> },
    { type: 'payment', message: 'Payment received', time: '1 hour ago', icon: <DollarSign /> },
    { type: 'rating', message: 'New 5-star review', time: '3 hours ago', icon: <Star /> },
    { type: 'product', message: 'Product updated', time: '1 day ago', icon: <Edit /> }
  ];

  const ProfileTab = () => (
    <div className="profile-tab">
      <div className="profile-header">
        <div className="avatar-section">
          <div className="avatar-container">
            <img src={user.avatar} alt={user.name} className="avatar" />
            <button className="avatar-edit-btn">
              <Camera size={16} />
            </button>
          </div>
          <div className="user-info">
            <h2 className="user-name">{user.name}</h2>
            <p className="user-role">{user.role} • {user.shopName}</p>
            <p className="user-join-date">Member since {user.joinDate}</p>
          </div>
        </div>
        <button className="edit-profile-btn">
          <Edit size={16} />
          Edit Profile
        </button>
      </div>

      <div className="contact-info">
        <h3 className="section-title">Contact Information</h3>
        <div className="contact-grid">
          <div className="contact-item">
            <Mail className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">Email</span>
              <span className="contact-value">{user.email}</span>
            </div>
          </div>
          <div className="contact-item">
            <Phone className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">Phone</span>
              <span className="contact-value">{user.phone}</span>
            </div>
          </div>
          <div className="contact-item">
            <MapPin className="contact-icon" />
            <div className="contact-details">
              <span className="contact-label">Location</span>
              <span className="contact-value">{user.location}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h3 className="section-title">Performance Overview</h3>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                {stat.icon}
              </div>
              <div className="stat-content">
                <h4 className="stat-value">{stat.value}</h4>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recent-activity">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-list">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-icon">
                {activity.icon}
              </div>
              <div className="activity-content">
                <p className="activity-message">{activity.message}</p>
                <span className="activity-time">{activity.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const SettingsTab = () => (
    <div className="settings-tab">
      <h3 className="section-title">Account Settings</h3>
      <div className="settings-list">
        <div className="setting-item">
          <div className="setting-info">
            <h4 className="setting-title">Personal Information</h4>
            <p className="setting-description">Update your name, email, and contact details</p>
          </div>
          <button className="setting-action">Edit</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <h4 className="setting-title">Business Information</h4>
            <p className="setting-description">Manage your shop details and business profile</p>
          </div>
          <button className="setting-action">Edit</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <h4 className="setting-title">Payment Methods</h4>
            <p className="setting-description">Add or update your payment information</p>
          </div>
          <button className="setting-action">Manage</button>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <h4 className="setting-title">Privacy Settings</h4>
            <p className="setting-description">Control your privacy and data sharing preferences</p>
          </div>
          <button className="setting-action">Configure</button>
        </div>
      </div>
    </div>
  );

  const NotificationsTab = () => (
    <div className="notifications-tab">
      <h3 className="section-title">Notification Preferences</h3>
      <div className="notification-settings">
        <div className="notification-item">
          <div className="notification-info">
            <h4 className="notification-title">Order Notifications</h4>
            <p className="notification-description">Get notified about new orders and updates</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="notification-item">
          <div className="notification-info">
            <h4 className="notification-title">Payment Notifications</h4>
            <p className="notification-description">Receive alerts for payments and transactions</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" defaultChecked />
            <span className="toggle-slider"></span>
          </label>
        </div>
        <div className="notification-item">
          <div className="notification-info">
            <h4 className="notification-title">Marketing Updates</h4>
            <p className="notification-description">Stay updated with promotions and offers</p>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );

  const SecurityTab = () => (
    <div className="security-tab">
      <h3 className="section-title">Security Settings</h3>
      <div className="security-list">
        <div className="security-item">
          <div className="security-info">
            <h4 className="security-title">Change Password</h4>
            <p className="security-description">Update your account password</p>
          </div>
          <button className="security-action">Change</button>
        </div>
        <div className="security-item">
          <div className="security-info">
            <h4 className="security-title">Two-Factor Authentication</h4>
            <p className="security-description">Add an extra layer of security to your account</p>
          </div>
          <button className="security-action">Enable</button>
        </div>
        <div className="security-item">
          <div className="security-info">
            <h4 className="security-title">Login History</h4>
            <p className="security-description">View recent login activity</p>
          </div>
          <button className="security-action">View</button>
        </div>
      </div>
    </div>
  );

  const HelpTab = () => (
    <div className="help-tab">
      <h3 className="section-title">Help & Support</h3>
      <div className="help-list">
        <div className="help-item">
          <h4 className="help-title">How to add products?</h4>
          <p className="help-description">Learn how to add and manage your products</p>
        </div>
        <div className="help-item">
          <h4 className="help-title">Payment issues</h4>
          <p className="help-description">Get help with payment and transaction problems</p>
        </div>
        <div className="help-item">
          <h4 className="help-title">Account settings</h4>
          <p className="help-description">Manage your account and profile settings</p>
        </div>
        <div className="help-item">
          <h4 className="help-title">Contact support</h4>
          <p className="help-description">Get in touch with our support team</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileTab />;
      case 'settings': return <SettingsTab />;
      case 'notifications': return <NotificationsTab />;
      case 'security': return <SecurityTab />;
      case 'help': return <HelpTab />;
      default: return <ProfileTab />;
    }
  };

  return (
    <div className="profile-container with-bottom-nav-padding">
      <div className="profile-sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-title">Account</h1>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>
      
      <div className="profile-content">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Profile;
