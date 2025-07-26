import { Box, Home, MapPin, ShoppingBag, User } from "lucide-react";
import React from "react";
import "./BottomNav.css";

const navItems = [
  { label: "Home", icon: <Home size={24} />, active: false },
  { label: "Products", icon: <Box size={24} />, active: false },
  { label: "Orders", icon: <ShoppingBag size={24} />, active: true },
  { label: "Nearby", icon: <MapPin size={24} />, active: false },
  { label: "Profile", icon: <User size={24} />, active: false },
];

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {navItems.map((item) => (
        <div
          key={item.label}
          className={`bottom-nav-item${item.active ? " active" : ""}`}
        >
          <span className="bottom-nav-icon">{item.icon}</span>
          <span className="bottom-nav-label">{item.label}</span>
        </div>
      ))}
    </nav>
  );
} 