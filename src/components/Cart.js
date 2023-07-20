import React from 'react';

const Cart = ({ cartItems, removeFromCart }) => {
  // Tính tổng giá trị đơn hàng
  const getTotal = () => {
    let total = 0;
    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total.toFixed(2); // Làm tròn đến 2 chữ số thập phân
  };

  return (
    <div className="cart-container">
      <h1>Cart</h1>
      {/* Hiển thị danh sách sản phẩm trong giỏ hàng */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId}>
                {/* Hiển thị thông tin cơ bản của sản phẩm trong giỏ hàng */}
                {item.name}, Quantity: {item.quantity}, Price: ${item.price * item.quantity}
                <button onClick={() => removeFromCart(item.productId)}>Remove</button>
                {/* Thêm liên kết để xem chi tiết sản phẩm */}
                <a href={`/product/${item.productId}`}>View Product</a>
              </li>
            ))}
          </ul>
          <p>Total: ${getTotal()}</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
