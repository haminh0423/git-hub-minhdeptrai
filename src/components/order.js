import React from 'react';
import './App.css';
import ProductItem from './ProductItem';
import OrderItem from './OrderItem';

import data from './data'; // Truyền dữ liệu sản phẩm và đơn hàng vào từ file data

function Order() {
  const { products, orders } = data;

  return (
    <div className="Order">
      <div className="products-container">
        <h1>Products</h1>
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div className="orders-container">
        <h1>Orders</h1>
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default Order;