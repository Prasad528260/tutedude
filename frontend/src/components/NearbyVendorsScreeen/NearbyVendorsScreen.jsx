import React, { useState } from "react";
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  Grid,
  Map,
  Phone,
  MessageCircle,
  ChevronDown,
  Users,
  ShoppingCart,
  Handshake,
  Building2,
  Mail,
  Globe,
} from "lucide-react";
import '../../App.css'

const NearbyVendorsScreen = () => {
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'map'
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [collaborationRequests, setCollaborationRequests] = useState(new Set());
  const [sortBy, setSortBy] = useState("distance");
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.4595, lng: 77.0266 }); // Gurgaon center

  // Updated data structure with professional images
  const vendors = [
    {
      id: "1",
      user: {
        name: "Rajesh Kumar",
        email: "rajesh@gmail.com",
        contactNumber: "+91 98765 43210",
        location: "gurgaon",
        image:
          "https://images.unsplash.com/photo-1556157382-97eda2d62296?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Fresh Farm Produce",
        description: "Premium organic vegetables and fresh fruits",
        location: "sector 14, gurgaon",
        image:
          "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=400&h=250&fit=crop",
        totalOrders: 245,
        isOpen: true,
        coordinates: { lat: 28.4595, lng: 77.0266 },
      },
      products: [
        {
          category: "Vegetables & Fruits",
          name: "Organic Tomatoes",
          price: 40,
        },
        { category: "Vegetables & Fruits", name: "Fresh Onions", price: 25 },
        { category: "Vegetables & Fruits", name: "Potatoes", price: 20 },
      ],
      orders: [
        { totalAmount: 500, status: "completed", createdAt: "2024-01-20" },
        { totalAmount: 750, status: "completed", createdAt: "2024-01-18" },
      ],
      distance: 0.5,
      rating: 4.8,
      deliveryTime: "15-20 min",
      collaborations: 12,
      lastActive: new Date("2024-01-21T10:30:00"),
      bulkInterests: ["Tomatoes", "Onions", "Potatoes"],
    },
    {
      id: "2",
      user: {
        name: "Priya Sharma",
        email: "priya@gmail.com",
        contactNumber: "+91 87654 32109",
        location: "delhi",
        image:
          "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Spice Garden",
        description: "Premium spices and authentic herbs",
        location: "old delhi road, delhi",
        image:
          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop",
        totalOrders: 180,
        isOpen: false,
        coordinates: { lat: 28.47, lng: 77.035 },
      },
      products: [
        { category: "Spices & Herbs", name: "Turmeric Powder", price: 120 },
        { category: "Spices & Herbs", name: "Red Chili", price: 150 },
      ],
      orders: [
        { totalAmount: 300, status: "completed", createdAt: "2024-01-19" },
      ],
      distance: 0.8,
      rating: 4.6,
      deliveryTime: "20-25 min",
      collaborations: 8,
      lastActive: new Date("2024-01-20T14:15:00"),
      bulkInterests: ["Turmeric", "Red Chili", "Cumin"],
    },
    {
      id: "3",
      user: {
        name: "Suresh Patel",
        email: "suresh@gmail.com",
        contactNumber: "+91 76543 21098",
        location: "mumbai",
        image:
          "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Dairy Delights",
        description: "Pure milk and homemade dairy products",
        location: "vasant vihar, mumbai",
        image:
          "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=250&fit=crop",
        totalOrders: 320,
        isOpen: true,
        coordinates: { lat: 28.44, lng: 77.04 },
      },
      products: [
        { category: "Dairy Products", name: "Pure Milk", price: 60 },
        { category: "Dairy Products", name: "Homemade Paneer", price: 200 },
      ],
      orders: [
        { totalAmount: 800, status: "completed", createdAt: "2024-01-21" },
        { totalAmount: 600, status: "processing", createdAt: "2024-01-20" },
      ],
      distance: 1.2,
      rating: 4.9,
      deliveryTime: "25-30 min",
      collaborations: 15,
      lastActive: new Date("2024-01-21T16:45:00"),
      bulkInterests: ["Milk Packets", "Ghee", "Butter"],
    },
    {
      id: "4",
      user: {
        name: "Amit Singh",
        email: "amit@gmail.com",
        contactNumber: "+91 65432 10987",
        location: "noida",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Grain Mart",
        description: "Wholesale grains and premium quality pulses",
        location: "phase 2, noida",
        image:
          "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=250&fit=crop",
        totalOrders: 150,
        isOpen: true,
        coordinates: { lat: 28.455, lng: 77.018 },
      },
      products: [
        { category: "Grains & Pulses", name: "Basmati Rice", price: 80 },
        { category: "Grains & Pulses", name: "Moong Dal", price: 120 },
      ],
      orders: [
        { totalAmount: 1200, status: "completed", createdAt: "2024-01-19" },
      ],
      distance: 1.5,
      rating: 4.4,
      deliveryTime: "30-35 min",
      collaborations: 22,
      lastActive: new Date("2024-01-21T09:20:00"),
      bulkInterests: ["Rice", "Wheat", "Dal Varieties"],
    },
    {
      id: "5",
      user: {
        name: "Meera Joshi",
        email: "meera@gmail.com",
        contactNumber: "+91 54321 09876",
        location: "delhi",
        image:
          "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Sweet Treats",
        description: "Traditional sweets and fresh bakery items",
        location: "karol bagh, delhi",
        image:
          "https://images.unsplash.com/photo-1555507036-ab794f27c4e8?w=400&h=250&fit=crop",
        totalOrders: 95,
        isOpen: false,
        coordinates: { lat: 28.465, lng: 77.03 },
      },
      products: [
        { category: "Bakery & Sweets", name: "Gulab Jamun", price: 250 },
        { category: "Bakery & Sweets", name: "Fresh Bread", price: 40 },
      ],
      orders: [
        { totalAmount: 350, status: "completed", createdAt: "2024-01-18" },
      ],
      distance: 2.0,
      rating: 4.7,
      deliveryTime: "20-25 min",
      collaborations: 9,
      lastActive: new Date("2024-01-20T11:30:00"),
      bulkInterests: ["Sugar", "Flour", "Dry Fruits"],
    },
    {
      id: "6",
      user: {
        name: "Vikash Gupta",
        email: "vikash@gmail.com",
        contactNumber: "+91 99887 65432",
        location: "gurgaon",
        image:
          "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Urban Kitchen Supplies",
        description: "Professional kitchen equipment and utensils",
        location: "cyber city, gurgaon",
        image:
          "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop",
        totalOrders: 420,
        isOpen: true,
        coordinates: { lat: 28.485, lng: 77.09 },
      },
      products: [
        {
          category: "Kitchen & Equipment",
          name: "Commercial Mixer",
          price: 15000,
        },
        { category: "Kitchen & Equipment", name: "Steel Utensils", price: 800 },
      ],
      orders: [
        { totalAmount: 25000, status: "completed", createdAt: "2024-01-19" },
        { totalAmount: 12000, status: "processing", createdAt: "2024-01-21" },
      ],
      distance: 0.3,
      rating: 4.7,
      deliveryTime: "10-15 min",
      collaborations: 28,
      lastActive: new Date("2024-01-21T14:20:00"),
      bulkInterests: ["Commercial Equipment", "Utensils", "Storage Solutions"],
    },
    {
      id: "7",
      user: {
        name: "Anjali Verma",
        email: "anjali@gmail.com",
        contactNumber: "+91 88776 54321",
        location: "delhi",
        image:
          "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Organic Health Store",
        description: "Certified organic products and health supplements",
        location: "lajpat nagar, delhi",
        image:
          "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=250&fit=crop",
        totalOrders: 310,
        isOpen: true,
        coordinates: { lat: 28.42, lng: 77.015 },
      },
      products: [
        { category: "Health & Organic", name: "Organic Quinoa", price: 350 },
        { category: "Health & Organic", name: "Protein Powder", price: 1200 },
      ],
      orders: [
        { totalAmount: 2500, status: "completed", createdAt: "2024-01-20" },
      ],
      distance: 1.8,
      rating: 4.9,
      deliveryTime: "25-30 min",
      collaborations: 18,
      lastActive: new Date("2024-01-21T08:45:00"),
      bulkInterests: ["Organic Products", "Supplements", "Health Foods"],
    },
    {
      id: "8",
      user: {
        name: "Rohit Mehta",
        email: "rohit@gmail.com",
        contactNumber: "+91 77665 43210",
        location: "faridabad",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        role: "vendor",
      },
      shop: {
        shopName: "Textile Hub",
        description: "Premium fabrics and textile supplies",
        location: "old faridabad, faridabad",
        image:
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop",
        totalOrders: 275,
        isOpen: false,
        coordinates: { lat: 28.385, lng: 77.055 },
      },
      products: [
        { category: "Textiles & Fabrics", name: "Cotton Fabric", price: 180 },
        { category: "Textiles & Fabrics", name: "Silk Cloth", price: 450 },
      ],
      orders: [
        { totalAmount: 8500, status: "completed", createdAt: "2024-01-18" },
      ],
      distance: 2.2,
      rating: 4.5,
      deliveryTime: "35-40 min",
      collaborations: 16,
      lastActive: new Date("2024-01-20T16:30:00"),
      bulkInterests: [
        "Cotton Materials",
        "Silk Products",
        "Fabric Accessories",
      ],
    },
  ];

  const categories = [
    "All",
    "Vegetables & Fruits",
    "Spices & Herbs",
    "Dairy Products",
    "Grains & Pulses",
    "Bakery & Sweets",
    "Kitchen & Equipment",
    "Health & Organic",
    "Textiles & Fabrics",
  ];
  const sortOptions = [
    { value: "distance", label: "Distance" },
    { value: "rating", label: "Rating" },
    { value: "collaborations", label: "Collaborations" },
    { value: "recent", label: "Recently Active" },
  ];

  const categoryColors = {
    "Vegetables & Fruits": "bg-green-500",
    "Spices & Herbs": "bg-orange-500",
    "Dairy Products": "bg-blue-500",
    "Grains & Pulses": "bg-yellow-500",
    "Bakery & Sweets": "bg-pink-500",
    "Kitchen & Equipment": "bg-purple-500",
    "Health & Organic": "bg-emerald-500",
    "Textiles & Fabrics": "bg-indigo-500",
  };

  const sendCollaborationRequest = (vendorId) => {
    const newRequests = new Set(collaborationRequests);
    newRequests.add(vendorId);
    setCollaborationRequests(newRequests);
  };

  // Sorting function
  const sortVendors = (vendors, sortBy) => {
    return [...vendors].sort((a, b) => {
      switch (sortBy) {
        case "distance":
          return a.distance - b.distance;
        case "rating":
          return b.rating - a.rating;
        case "collaborations":
          return b.collaborations - a.collaborations;
        case "recent":
          return new Date(b.lastActive) - new Date(a.lastActive);
        default:
          return 0;
      }
    });
  };

  const filteredVendors = vendors.filter((vendor) => {
    const primaryCategory = vendor.products[0]?.category || "";
    const matchesSearch =
      vendor.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.shop.shopName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      primaryCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.shop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.bulkInterests.some((interest) =>
        interest.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesFilter =
      selectedFilter === "all" || primaryCategory === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const sortedVendors = sortVendors(filteredVendors, sortBy);

  const getMinOrderAmount = (products) => {
    if (!products || products.length === 0) return 0;
    return Math.min(...products.map((p) => p.price));
  };

  const getSpecialities = (products) => {
    if (!products || products.length === 0) return [];
    const categories = [...new Set(products.map((p) => p.category))];
    return categories.slice(0, 2);
  };

  // Map positioning function
  const getMapPosition = (vendor) => {
    const baseX = 50;
    const baseY = 50;

    const x = baseX + (vendor.shop.coordinates.lng - mapCenter.lng) * 2000;
    const y = baseY - (vendor.shop.coordinates.lat - mapCenter.lat) * 2000;

    return {
      left: Math.max(5, Math.min(95, x)) + "%",
      top: Math.max(5, Math.min(95, y)) + "%",
    };
  };

  const VendorCard = ({ vendor }) => {
    const primaryCategory = vendor.products[0]?.category || "General";
    const minOrderAmount = getMinOrderAmount(vendor.products);
    const specialities = getSpecialities(vendor.products);

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300 p-4">
        <div className="flex items-center mb-3">
          <img
            src={vendor.user.image}
            alt={vendor.user.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
          />
          <div className="ml-3 flex-1">
            <h3 className="font-bold text-lg text-gray-900">
              {vendor.user.name}
            </h3>
            <p className="text-gray-600 text-sm">{primaryCategory}</p>
          </div>
          <div className="flex items-center px-2 py-1 rounded-full bg-[#C1DBB3]">
            <Star className="w-3 h-3 fill-green-800 text-green-800 mr-1" />
            <span className="text-sm font-semibold text-green-800">
              {vendor.rating}
            </span>
          </div>
        </div>

        <p className="text-gray-600 text-sm mb-3 leading-relaxed">
          {vendor.shop.description}
        </p>

        {/* Address */}
        <div className="flex items-start mb-3">
          <MapPin className="w-4 h-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
          <p className="text-gray-600 text-sm leading-relaxed capitalize">
            {vendor.shop.location}
          </p>
        </div>

        {/* Business Hours */}
        <div className="flex items-center mb-3">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-gray-600 text-sm">{vendor.deliveryTime}</span>
        </div>

        {/* Specialities */}
        <div className="mb-3">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            SPECIALITIES
          </p>
          <div className="flex flex-wrap gap-1">
            {specialities.map((speciality, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-medium text-gray-700"
                style={{ backgroundColor: "#C1DBB3" }}
              >
                {speciality}
              </span>
            ))}
          </div>
        </div>

        {/* Bulk Interests */}
        <div className="mb-4">
          <p className="text-xs font-semibold text-gray-500 mb-1">
            BULK ORDER INTERESTS
          </p>
          <div className="flex flex-wrap gap-1">
            {vendor.bulkInterests.map((interest, index) => (
              <span
                key={index}
                className="px-2 py-1 rounded-full text-xs font-medium text-gray-700"
                style={{ backgroundColor: "#F2C078" }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>

        {/* Collaboration Stats */}
        <div
          className="flex items-center justify-between mb-4 p-2 rounded-lg bg-yellow-100"
        >
          <div className="flex items-center">
            <Handshake className="w-4 h-4 mr-2 text-[#FE5D26]" />
            <span className="text-sm font-medium text-gray-700">
              {vendor.collaborations} Collabs
            </span>
          </div>
          <div className="flex items-center">
            <ShoppingCart className="w-4 h-4 mr-1 text-gray-500" />
            <span className="text-xs text-gray-600">
              {vendor.shop.totalOrders} orders
            </span>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded-full ${
              vendor.shop.isOpen
                ? "text-green-800 bg-[#C1DBB3]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {vendor.shop.isOpen ? "Open" : "Closed"}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <a
            href={`tel:${vendor.user.contactNumber}`}
            className="flex-1 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center bg-[#C1DBB3] hover:opacity-90 transition-opacity"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call
          </a>
          <button
            className="flex-1 text-white font-semibold py-2 px-3 rounded-lg flex items-center justify-center bg-[#F2C078] hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat
          </button>
          <button
            onClick={() => sendCollaborationRequest(vendor.id)}
            disabled={collaborationRequests.has(vendor.id)}
            className={`flex-1 font-semibold py-2 px-3 rounded-lg transition-colors flex items-center justify-center ${
              collaborationRequests.has(vendor.id)
                ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                : "text-white bg-[#FE5D26]"
            }`}
            onMouseEnter={(e) => {
              if (!collaborationRequests.has(vendor.id)) {
                e.target.style.opacity = "0.9";
              }
            }}
            onMouseLeave={(e) => {
              if (!collaborationRequests.has(vendor.id)) {
                e.target.style.opacity = '1';
              }
            }}
          >
            <Users className="w-4 h-4 mr-2" />
            {collaborationRequests.has(vendor.id) ? 'Sent' : 'Collaborate'}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Filters and Sort */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="flex space-x-2 overflow-x-auto pb-2 w-full md:w-auto">
          <button
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
              selectedFilter === 'all' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedFilter('all')}
          >
            All
          </button>
          {categories.slice(1).map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                selectedFilter === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
              onClick={() => setSelectedFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  Sort by: {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-6">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
              viewMode === 'list'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setViewMode('list')}
          >
            <Grid className="inline-block h-4 w-4 mr-2" />
            List View
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
              viewMode === 'map'
                ? 'bg-green-600 text-white border-green-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => setViewMode('map')}
          >
            <Map className="inline-block h-4 w-4 mr-2" />
            Map View
          </button>
        </div>
      </div>

      {/* Content */}
      {viewMode === 'list' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedVendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>
      ) : (
        <div className="relative h-[600px] rounded-xl overflow-hidden border border-gray-200">
          <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
            <p className="text-gray-500">Map View - Interactive map will be displayed here</p>
          </div>
          {/* Map markers would be rendered here */}
          {sortedVendors.map((vendor) => {
            const position = getMapPosition(vendor);
            return (
              <div
                key={vendor.id}
                className="absolute w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
                style={position}
                onClick={() => setSelectedVendor(selectedVendor?.id === vendor.id ? null : vendor)}
              >
                <Building2 className="w-4 h-4" />
              </div>
            );
          })}
        </div>
      )}

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold text-gray-800">{selectedVendor.shop.shopName}</h2>
                <button
                  onClick={() => setSelectedVendor(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                  <span className="text-gray-700 font-medium">{selectedVendor.rating}</span>
                  <span className="text-gray-500 text-sm ml-2">({selectedVendor.reviews} reviews)</span>
                </div>
                <span className="mx-2 text-gray-400">•</span>
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-gray-600">{selectedVendor.shop.location}</span>
                </div>
              </div>
              
              <p className="text-gray-700 mb-6">{selectedVendor.shop.description}</p>
              
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-2">Business Hours</h3>
                <p className="text-gray-600">{selectedVendor.businessHours}</p>
              </div>
              
              <div className="flex space-x-3">
                <a
                  href={`tel:${selectedVendor.user.contactNumber}`}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg text-center font-medium transition-colors"
                >
                  Call Now
                </a>
                <button
                  className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  onClick={() => {
                    sendCollaborationRequest(selectedVendor.id);
                    setSelectedVendor(null);
                  }}
                  disabled={collaborationRequests.has(selectedVendor.id)}
                >
                  {collaborationRequests.has(selectedVendor.id) ? 'Collaboration Requested' : 'Request Collaboration'}
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