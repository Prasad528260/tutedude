import { Box, Home, MapPin, ShoppingBag, User } from "lucide-react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BottomNav.css";

const navItems = [
  { label: "Home", icon: <Home size={24} />, path: "/body/home" },
  { label: "Products", icon: <Box size={24} />, path: "/body/products" },
  { label: "Orders", icon: <ShoppingBag size={24} />, path: "/body/orders" },
  { label: "Nearby", icon: <MapPin size={24} />, path: "/body/nearby-vendors" },
  { label: "Profile", icon: <User size={24} />, path: "/body/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (path) => {
    navigate(path);
  };

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.label}
            className={`bottom-nav-item${isActive ? " active" : ""}`}
            onClick={() => handleNavClick(item.path)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </div>
        );
      })}
    </nav>
  );
} 