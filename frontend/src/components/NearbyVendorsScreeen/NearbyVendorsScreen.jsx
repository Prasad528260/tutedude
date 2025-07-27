import {
  ChevronDown,
  Clock,
  Filter,
  Handshake,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShoppingCart,
  Star,
  Users
} from "lucide-react";
import React, { useState } from "react";
import './NearbyVendorsScreen.css';

const NearbyVendorsScreen = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collaborationRequests, setCollaborationRequests] = useState(new Set());
  const [sortBy, setSortBy] = useState("distance");
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Vendor data
  const vendors = [
    {
      id: "1",
      user: {
        name: "Rajesh Kumar",
        email: "rajesh@gmail.com",
        contactNumber: "+91 98765 43210",
        location: "gurgaon",
        image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Fresh Farm Produce",
        description: "Premium organic vegetables and fresh fruits",
        location: "sector 14, gurgaon",
        image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=250&fit=crop",
        totalOrders: 245,
        isOpen: true,
        coordinates: { lat: 28.4595, lng: 77.0266 },
      },
      products: [
        { category: "Vegetables & Fruits", name: "Organic Tomatoes", price: 40 },
        { category: "Vegetables & Fruits", name: "Fresh Onions", price: 25 },
        { category: "Vegetables & Fruits", name: "Potatoes", price: 20 },
      ],
      distance: 0.5,
      rating: 4.8,
      deliveryTime: "15-20 min",
      collaborations: 12,
      bulkInterests: ["Tomatoes", "Onions", "Potatoes"],
    },
    {
      id: "2",
      user: {
        name: "Priya Sharma",
        email: "priya@gmail.com",
        contactNumber: "+91 87654 32109",
        location: "delhi",
        image: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Spice Garden",
        description: "Premium spices and authentic herbs",
        location: "old delhi road, delhi",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        totalOrders: 180,
        isOpen: false,
        coordinates: { lat: 28.47, lng: 77.035 },
      },
      products: [
        { category: "Spices & Herbs", name: "Turmeric Powder", price: 120 },
        { category: "Spices & Herbs", name: "Red Chili", price: 150 },
      ],
      distance: 1.2,
      rating: 4.6,
      deliveryTime: "25-30 min",
      collaborations: 8,
      bulkInterests: ["Turmeric", "Red Chili", "Cumin"],
    },
    {
      id: "3",
      user: {
        name: "Amit Patel",
        email: "amit@gmail.com",
        contactNumber: "+91 76543 21098",
        location: "noida",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Dairy Delights",
        description: "Fresh dairy products and organic milk",
        location: "sector 62, noida",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=250&fit=crop",
        totalOrders: 320,
        isOpen: true,
        coordinates: { lat: 28.48, lng: 77.04 },
      },
      products: [
        { category: "Dairy", name: "Fresh Milk", price: 60 },
        { category: "Dairy", name: "Curd", price: 40 },
        { category: "Dairy", name: "Butter", price: 80 },
      ],
      distance: 0.8,
      rating: 4.9,
      deliveryTime: "10-15 min",
      collaborations: 15,
      bulkInterests: ["Milk", "Curd", "Butter"],
    },
    {
      id: "4",
      user: {
        name: "Sneha Verma",
        email: "sneha@gmail.com",
        contactNumber: "+91 65432 10987",
        location: "faridabad",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Bakery Bliss",
        description: "Artisanal breads and fresh pastries",
        location: "sector 16, faridabad",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
        totalOrders: 150,
        isOpen: true,
        coordinates: { lat: 28.46, lng: 77.03 },
      },
      products: [
        { category: "Bakery", name: "Whole Wheat Bread", price: 35 },
        { category: "Bakery", name: "Croissants", price: 25 },
        { category: "Bakery", name: "Cake", price: 200 },
      ],
      distance: 1.5,
      rating: 4.7,
      deliveryTime: "20-25 min",
      collaborations: 6,
      bulkInterests: ["Bread", "Pastries", "Cakes"],
    },
    {
      id: "5",
      user: {
        name: "Vikram Singh",
        email: "vikram@gmail.com",
        contactNumber: "+91 54321 09876",
        location: "ghaziabad",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Organic Valley",
        description: "100% organic fruits and vegetables",
        location: "raj nagar, ghaziabad",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
        totalOrders: 200,
        isOpen: true,
        coordinates: { lat: 28.45, lng: 77.02 },
      },
      products: [
        { category: "Organic", name: "Organic Apples", price: 120 },
        { category: "Organic", name: "Organic Carrots", price: 80 },
        { category: "Organic", name: "Organic Spinach", price: 60 },
      ],
      distance: 2.1,
      rating: 4.5,
      deliveryTime: "30-35 min",
      collaborations: 10,
      bulkInterests: ["Apples", "Carrots", "Spinach"],
    },
    {
      id: "6",
      user: {
        name: "Vikash Gupta",
        email: "vikash@gmail.com",
        contactNumber: "+91 99887 65432",
        location: "gurgaon",
        image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Urban Kitchen Supplies",
        description: "Professional kitchen equipment and utensils",
        location: "cyber city, gurgaon",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=250&fit=crop", // <-- new image link
        totalOrders: 420,
        isOpen: true,
        coordinates: { lat: 28.485, lng: 77.09 },
      },
      products: [
        { category: "Kitchen & Equipment", name: "Commercial Mixer", price: 15000 },
        { category: "Kitchen & Equipment", name: "Steel Utensils", price: 800 },
      ],
      distance: 0.3,
      rating: 4.7,
      deliveryTime: "10-15 min",
      collaborations: 28,
      bulkInterests: ["Commercial Equipment", "Utensils", "Storage Solutions"],
    },
    {
      id: "7",
      user: {
        name: "Anjali Verma",
        email: "anjali@gmail.com",
        contactNumber: "+91 88776 54321",
        location: "delhi",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Organic Health Store",
        description: "Certified organic products and health supplements",
        location: "lajpat nagar, delhi",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop",
        totalOrders: 310,
        isOpen: true,
        coordinates: { lat: 28.42, lng: 77.015 },
      },
      products: [
        { category: "Health & Organic", name: "Organic Quinoa", price: 350 },
        { category: "Health & Organic", name: "Protein Powder", price: 1200 },
      ],
      distance: 1.8,
      rating: 4.9,
      deliveryTime: "25-30 min",
      collaborations: 18,
      bulkInterests: ["Organic Products", "Supplements", "Health Foods"],
    },
    {
      id: "8",
      user: {
        name: "Rohit Mehta",
        email: "rohit@gmail.com",
        contactNumber: "+91 77665 43210",
        location: "faridabad",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Textile Hub",
        description: "Premium fabrics and textile supplies",
        location: "old faridabad, faridabad",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
        totalOrders: 275,
        isOpen: false,
        coordinates: { lat: 28.385, lng: 77.055 },
      },
      products: [
        { category: "Textiles & Fabrics", name: "Cotton Fabric", price: 180 },
        { category: "Textiles & Fabrics", name: "Silk Cloth", price: 450 },
      ],
      distance: 2.2,
      rating: 4.5,
      deliveryTime: "35-40 min",
      collaborations: 16,
      bulkInterests: ["Cotton Materials", "Silk Products", "Fabric Accessories"],
    },
  ];

  const categories = ["all", "Vegetables & Fruits", "Spices & Herbs", "Dairy", "Bakery", "Organic", "Kitchen & Equipment", "Health & Organic", "Textiles & Fabrics"];
  const sortOptions = [
    { label: "Distance", value: "distance" },
    { label: "Rating", value: "rating" },
    { label: "Delivery Time", value: "deliveryTime" },
    { label: "Collaborations", value: "collaborations" },
  ];

  const filteredVendors = vendors.filter((vendor) => {
    const matchesFilter = selectedFilter === "all" || vendor.products.some(product => product.category === selectedFilter);
    const matchesSearch = vendor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.shop.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortVendors = (vendors, sortBy) => {
    return [...vendors].sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance;
        case "rating":
          return b.rating - a.rating;
        case "deliveryTime": {
          const aTime = parseInt(a.deliveryTime.split("-")[0]);
          const bTime = parseInt(b.deliveryTime.split("-")[0]);
          return aTime - bTime;
        }
        case "collaborations":
          return b.collaborations - a.collaborations;
        default:
          return 0;
      }
    });
  };

  const sortedVendors = sortVendors(filteredVendors, sortBy);

  const sendCollaborationRequest = (vendorId) => {
    setCollaborationRequests(prev => new Set([...prev, vendorId]));
    console.log(`Collaboration request sent to vendor ${vendorId}`);
  };

  const getSpecialities = (products) => {
    const categories = [...new Set(products.map(p => p.category))];
    return categories.slice(0, 3);
  };

  const VendorCard = ({ vendor }) => {
    const primaryCategory = vendor.products[0]?.category || "General";
    const specialities = getSpecialities(vendor.products);

    return (
      <div className="vendor-card" style={{ position: "relative", overflow: "visible" }}>
        {/* Shop Banner Image */}
        <div style={{ position: "relative" }}>
          <img
            src={vendor.shop.image}
            alt={vendor.shop.shopName}
            style={{
              width: "100%",
              height: "120px",
              objectFit: "cover",
              borderTopLeftRadius: "1rem",
              borderTopRightRadius: "1rem"
            }}
          />
          {/* Status dot */}
          <span
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: vendor.shop.isOpen ? "#22c55e" : "#a3a3a3",
              border: "2px solid #fff"
            }}
          />
        </div>

        {/* Avatar - absolute, centered horizontally, overlaps banner and card */}
        <div
          style={{
            position: "absolute",
            top: 80, // 120px (banner height) - 40px (half avatar height)
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            background: "#fff",
            borderRadius: "50%",
            padding: 4,
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
          }}
        >
          <img
            src={vendor.user.image}
            alt={vendor.user.name}
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #fff",
              background: "#f3f4f6"
            }}
            className="vendor-avatar"
          />
        </div>

        {/* Card content, add top padding to avoid overlap */}
        <div style={{ paddingTop: 56 }}>
          <div className="vendor-header" style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div className="vendor-info">
              <h3 className="vendor-name">{vendor.user.name}</h3>
              <p className="vendor-category">{primaryCategory}</p>
            </div>
            <div className="rating-badge" style={{ marginLeft: "auto", display: "flex", alignItems: "center", background: "#fef3c7", borderRadius: 16, padding: "4px 10px" }}>
              <Star className="rating-star" style={{ color: "#f59e42", marginRight: 4 }} />
              <span className="rating-text">{vendor.rating}</span>
            </div>
          </div>

          <p className="vendor-description">
            {vendor.shop.description}
          </p>

          <div className="vendor-location">
            <MapPin className="location-icon" />
            <p className="location-text">
              {vendor.shop.location}
            </p>
          </div>

          <div className="vendor-delivery">
            <Clock className="delivery-icon" />
            <span className="delivery-text">{vendor.deliveryTime}</span>
          </div>

          <div className="vendor-specialities">
            <p className="specialities-label">
              Specialities
            </p>
            <div className="specialities-tags">
              {specialities.map((speciality, index) => (
                <span
                  key={index}
                  className="speciality-tag"
                >
                  {speciality}
                </span>
              ))}
            </div>
          </div>

          <div className="vendor-stats">
            <p className="stats-label">
              Bulk Interests
            </p>
            <div className="stats-tags">
              {vendor.bulkInterests.slice(0, 3).map((interest, index) => (
                <span
                  key={index}
                  className="stat-tag"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>

          <div className="vendor-metrics">
            <div className="metric-item">
              <Handshake className="metric-icon" style={{ color: "#FE5D26" }} />
              <span className="metric-text">
                {vendor.collaborations} collaborations
              </span>
            </div>
            <div className="metric-item">
              <ShoppingCart className="metric-icon" />
              <span className="metric-count">
                {vendor.shop.totalOrders} orders
              </span>
            </div>
          </div>

          <div className="vendor-status">
            <span className={`status-badge ${vendor.shop.isOpen ? 'open' : 'closed'}`}>
              {vendor.shop.isOpen ? "Open" : "Closed"}
            </span>
          </div>

          <div className="vendor-actions">
            <a
              href={`tel:${vendor.user.contactNumber}`}
              className="action-btn call-btn"
            >
              <Phone className="action-icon" />
              Call
            </a>
            <button className="action-btn chat-btn">
              <MessageCircle className="action-icon" />
              Chat
            </button>
            <button
              onClick={() => sendCollaborationRequest(vendor.id)}
              disabled={collaborationRequests.has(vendor.id)}
              className={`action-btn collaborate-btn ${collaborationRequests.has(vendor.id) ? 'disabled' : ''}`}
            >
              <Users className="action-icon" />
              {collaborationRequests.has(vendor.id) ? 'Sent' : 'Collaborate'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="nearby-vendors-container with-bottom-nav-padding">
      <div className="filters-section">
        <div className="filter-tabs">
          <div className="filter-tabs-container">
            <button
              className={`filter-tab ${selectedFilter === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedFilter('all')}
            >
              All
            </button>
            {categories.slice(1).map((category) => (
              <button
                key={category}
                className={`filter-tab ${selectedFilter === category ? 'active' : ''}`}
                onClick={() => setSelectedFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="sort-controls">
            <div className="search-input-container">
              <input
                type="text"
                className="search-input"
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="search-icon" />
            </div>
            <div className="sort-select-container">
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="sort-chevron" />
            </div>

            <button
              className="filter-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="filter-icon" />
              Filters
            </button>
          </div>
        </div>
      </div>

      <div className="vendors-grid">
        {sortedVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {selectedVendor && (
        <div className="vendor-modal-overlay">
          <div className="vendor-modal">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">{selectedVendor.shop.shopName}</h2>
                <button
                  className="modal-close"
                  onClick={() => setSelectedVendor(null)}
                >
                  <svg className="close-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="modal-rating">
                <div className="rating-info">
                  <Star className="modal-star" />
                  <span className="modal-rating-text">{selectedVendor.rating}</span>
                </div>
                <span className="rating-separator">•</span>
                <div className="modal-location">
                  <MapPin className="modal-location-icon" />
                  <span className="modal-location-text">{selectedVendor.shop.location}</span>
                </div>
              </div>
              <p className="modal-description">{selectedVendor.shop.description}</p>
              <div className="modal-actions">
                <button className="modal-action-btn primary">
                  Start Collaboration
                </button>
                <button className="modal-action-btn secondary">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NearbyVendorsScreen;