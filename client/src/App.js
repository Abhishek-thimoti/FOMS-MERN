import { useState, useEffect } from "react";
import Cart from "./Cart";

function App() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  // Get userId from localStorage
  const userId = localStorage.getItem("userId");

  // Fetch menu items
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then(res => res.json())
      .then(data => setMenu(data))
      .catch(err => console.error("Error fetching menu:", err));
  }, []);

  // Add item to cart
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  return (
    <div>
      <h1>Delicious Menu</h1>

      {/* Menu Section */}
      {menu.map(item => (
        <div key={item._id}>
          <h3>{item.itemName}</h3>
          <p>{item.category} - ₹{item.price}</p>
          <button onClick={() => addToCart(item)}>
            Add to Cart
          </button>
        </div>
      ))}

      {/* Cart Section */}
      <Cart userId={userId} cart={cart} setCart={setCart} />
    </div>
  );
}

export default App;