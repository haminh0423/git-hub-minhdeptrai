import React from 'react';

const ProductItem = ({ product }) => {
  return (
    <div className="product-item">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Category: {product.category}</p>
      </div>
    </div>
  );
};

export default ProductItem;