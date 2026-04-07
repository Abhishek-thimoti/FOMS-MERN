import React from "react";

function Cart({ userId, cart, setCart }) {

  const placeOrder = async () => {
    console.log("Button clicked 🚀");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          items: cart.map(item => ({
            itemName: item.itemName,
            quantity: 1,
            price: item.price
          })),
          totalPrice: cart.reduce((sum, item) => sum + item.price, 0)
        })
      });

      const data = await response.json();

      console.log("Server response:", data);

      if (response.ok) {
        alert("✅ Order placed successfully!");
        setCart([]);
      } else {
        alert("❌ Order failed");
      }

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Failed to place order");
    }
  };

  return (
    <div>
      <h2>Your Cart</h2>

      {cart && cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.itemName} - ₹{item.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>Cart is empty</p>
      )}

      <h3>
        Total: ₹{cart.reduce((sum, item) => sum + item.price, 0)}
      </h3>

      <button onClick={placeOrder}>
        Proceed to Payment
      </button>
    </div>
  );
}

export default Cart;