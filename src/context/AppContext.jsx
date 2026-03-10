import { createContext, useState, useEffect } from 'react';
import { initialDishes } from '../data/dishes';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [dishes, setDishes] = useState(() => {
    const localData = localStorage.getItem('dishes');
    return localData ? JSON.parse(localData) : initialDishes;
  });

  const [cart, setCart] = useState(() => {
    const localData = localStorage.getItem('cart');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('dishes', JSON.stringify(dishes));
  }, [dishes]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (dish) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === dish.id);
      if (exists) {
        return prev.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (id, amount) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return { ...item, quantity: newQty > 0 ? newQty : 1 };
        }
        return item;
      })
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const addDish = (dish) => {
    setDishes([...dishes, { ...dish, id: Date.now() }]);
  };

  const editDish = (updatedDish) => {
    setDishes((prev) =>
      prev.map((dish) => (dish.id === updatedDish.id ? updatedDish : dish))
    );
  };

  const deleteDish = (id) => {
    setDishes((prev) => prev.filter((dish) => dish.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        dishes,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        addDish,
        editDish,
        deleteDish
      }}
    >
      {children}
    </AppContext.Provider>
  );
};