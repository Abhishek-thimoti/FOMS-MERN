import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function CartSidebar() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-sidebar">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty</p>
      ) : (
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                <p>₹{Number(item.price).toFixed(2)} x {item.quantity}</p>
              </div>
              <div className="cart-actions">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>x</button>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="cart-footer">
        <h3>Total: ₹{total.toFixed(2)}</h3>
        <div className="cart-footer-actions">
          <button 
            className="clear-cart-btn" 
            disabled={cart.length === 0}
            onClick={clearCart}
          >
            Clear Cart
          </button>
          <button 
            className="checkout-btn" 
            disabled={cart.length === 0}
            onClick={() => navigate('/payment')}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartSidebar;