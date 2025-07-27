import React from "react";
import { useNavigate } from "react-router-dom";
const ProductCard = ({
  name = "Sample Product",
  description = "This is a sample product description.",
  price = 99.99,
  category = "Electronics",
  image = "https://via.placeholder.com/300x200/f0f0f0/666?text=Product+Image",
  stock = 10,
  available = true,
}) => {
    const navigate = useNavigate();
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md max-w-sm mx-auto overflow-hidden">
      {/* Product Image */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {/* Product Details */}
      <div className="p-4">
        {/* Category */}
        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full mb-2">
          {category}
        </span>

        {/* Product Name */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{name}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-3">{description}</p>

        {/* Price */}
        <div className="text-2xl font-bold text-gray-900 mb-3">${price}</div>

        {/* Stock */}
        <div className="text-sm text-gray-600 mb-4">Stock: {stock}</div>

        {/* Available */}
        <div className="text-sm mb-4">
          Status:{" "}
          <span className={available ? "text-green-600" : "text-red-600"}>
            {available ? "Available" : "Not Available"}
          </span>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            className="w-full py-2 px-4 rounded-md font-medium text-sm bg-black text-white hover:bg-gray-800 transition-colors"
            onClick={() => navigate(`/products/${id}`)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;
