import {
    DollarSign,
    Edit,
    Eye,
    Filter,
    Grid,
    List,
    Package,
    Plus,
    Search,
    Trash2,
    TrendingUp
} from 'lucide-react';
import React, { useState } from 'react';
const css = require('./Products.css');

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Mock products data
  const products = [
    {
      id: 1,
      name: "Organic Tomatoes",
      category: "Vegetables",
      price: 40,
      stock: 50,
      image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=300&h=200&fit=crop",
      status: "active",
      sales: 120,
      rating: 4.5
    },
    {
      id: 2,
      name: "Fresh Onions",
      category: "Vegetables", 
      price: 25,
      stock: 100,
      image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=300&h=200&fit=crop",
      status: "active",
      sales: 85,
      rating: 4.2
    },
    {
      id: 3,
      name: "Premium Turmeric",
      category: "Spices",
      price: 120,
      stock: 30,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      status: "active",
      sales: 45,
      rating: 4.8
    },
    {
      id: 4,
      name: "Fresh Milk",
      category: "Dairy",
      price: 60,
      stock: 25,
      image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=200&fit=crop",
      status: "low-stock",
      sales: 200,
      rating: 4.9
    },
    {
      id: 5,
      name: "Whole Wheat Bread",
      category: "Bakery",
      price: 35,
      stock: 40,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=200&fit=crop",
      status: "active",
      sales: 75,
      rating: 4.3
    },
    {
      id: 6,
      name: "Commercial Mixer",
      category: "Equipment",
      price: 15000,
      stock: 5,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=200&fit=crop",
      status: "active",
      sales: 8,
      rating: 4.7
    }
  ];

  const categories = ['all', 'Vegetables', 'Spices', 'Dairy', 'Bakery', 'Equipment'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return { bg: '#d1fae5', text: '#065f46' };
      case 'low-stock': return { bg: '#fef3c7', text: '#92400e' };
      case 'out-of-stock': return { bg: '#fee2e2', text: '#991b1b' };
      default: return { bg: '#f3f4f6', text: '#6b7280' };
    }
  };

  const ProductCard = ({ product }) => {
    const statusColors = getStatusColor(product.status);
    
    return (
      <div className="product-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.name} className="product-image" />
          <div className="product-actions">
            <button className="action-btn edit-btn">
              <Edit size={16} />
            </button>
            <button className="action-btn view-btn">
              <Eye size={16} />
            </button>
            <button className="action-btn delete-btn">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-category">{product.category}</p>
          
          <div className="product-stats">
            <div className="stat-item">
              <DollarSign size={14} />
              <span>₹{product.price}</span>
            </div>
            <div className="stat-item">
              <Package size={14} />
              <span>{product.stock} in stock</span>
            </div>
            <div className="stat-item">
              <TrendingUp size={14} />
              <span>{product.sales} sold</span>
            </div>
          </div>
          
          <div className="product-footer">
            <span 
              className="status-badge"
              style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
            >
              {product.status.replace('-', ' ')}
            </span>
            <div className="rating">
              <span className="rating-stars">★★★★☆</span>
              <span className="rating-value">{product.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ProductListItem = ({ product }) => {
    const statusColors = getStatusColor(product.status);
    
    return (
      <div className="product-list-item">
        <div className="list-item-image">
          <img src={product.image} alt={product.name} />
        </div>
        
        <div className="list-item-info">
          <div className="list-item-main">
            <h3 className="list-item-name">{product.name}</h3>
            <p className="list-item-category">{product.category}</p>
          </div>
          
          <div className="list-item-stats">
            <div className="list-stat">
              <DollarSign size={14} />
              <span>₹{product.price}</span>
            </div>
            <div className="list-stat">
              <Package size={14} />
              <span>{product.stock}</span>
            </div>
            <div className="list-stat">
              <TrendingUp size={14} />
              <span>{product.sales}</span>
            </div>
          </div>
          
          <div className="list-item-footer">
            <span 
              className="status-badge"
              style={{ backgroundColor: statusColors.bg, color: statusColors.text }}
            >
              {product.status.replace('-', ' ')}
            </span>
            <div className="list-item-actions">
              <button className="list-action-btn">
                <Edit size={14} />
              </button>
              <button className="list-action-btn">
                <Eye size={14} />
              </button>
              <button className="list-action-btn">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="products-container with-bottom-nav-padding">
      {/* Header */}
      <div className="products-header">
        <div className="header-left">
          <h1 className="products-title">Products</h1>
          <p className="products-subtitle">Manage your product inventory</p>
        </div>
        <button className="add-product-btn">
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="products-filters">
        <div className="search-container">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <select
            className="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
          
          <button 
            className="filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            Filters
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="view-toggle">
        <div className="toggle-group">
          <button
            className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
          >
            <Grid size={16} />
            Grid
          </button>
          <button
            className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
          >
            <List size={16} />
            List
          </button>
        </div>
      </div>

      {/* Products Display */}
      <div className="products-content">
        {viewMode === 'grid' ? (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="products-list">
            {filteredProducts.map(product => (
              <ProductListItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 