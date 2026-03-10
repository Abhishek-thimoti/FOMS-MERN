import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const { cart, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = () => {
    clearCart();
    setSuccess(true);
    setTimeout(() => {
      navigate('/menu');
    }, 3000);
  };

  if (success) {
    return (
      <div className="payment-page">
        <div className="success-message">
          <h2>Payment Successful! 🎉</h2>
          <p>Your order is being prepared. Redirecting to menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h2>Order Summary</h2>
        <div className="order-list">
          {cart.map((item) => (
            <div key={item.id} className="order-item">
              <span>{item.name} (x{item.quantity})</span>
              <span>₹{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <h3 className="total-amount">Total: ₹{total.toFixed(2)}</h3>
        <div className="payment-actions">
          <button className="back-btn" onClick={() => navigate('/menu')}>Back to Menu</button>
          <button className="confirm-btn" onClick={handlePayment}>Confirm Payment</button>
        </div>
      </div>
    </div>
  );
}

export default Payment;