import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { BASE_URL } from "../constants/constant";
import axios from "axios";
const Products = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`,{},{withCredentials:true});
    const data = response.data;
    setProducts(data);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;
