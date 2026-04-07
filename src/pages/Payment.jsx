import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Payment() {
  const { cart, clearCart } = useContext(AppContext);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePayment = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const orderData = {
      orderItems: cart.map(item => ({ name: item.name, qty: item.quantity, price: item.price })),
      totalPrice: total,
      userId: user ? user._id : '64f1b2b3c4346b0a1a234567' // Fallback for testing without login
    };

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      
      if (response.ok) {
        clearCart();
        setSuccess(true);
        setTimeout(() => {
          navigate('/menu');
        }, 3000);
      } else {
        alert("Payment failed: Server Error");
      }
    } catch (error) {
      console.error(error);
      alert("Payment failed: Network Error");
    }
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