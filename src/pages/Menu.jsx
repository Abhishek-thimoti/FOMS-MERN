import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import DishCard from '../components/DishCard';
import CartSidebar from '../components/CartSidebar';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const { dishes } = useContext(AppContext);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filteredDishes = dishes.filter(dish =>
    dish.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="menu-page">
      <header className="menu-header">
        <h1>Delicious Menu</h1>
        <input
          type="text"
          placeholder="Search for dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />
        <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
      </header>
      
      <div className="menu-layout">
        <div className="dishes-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
        <CartSidebar />
      </div>
    </div>
  );
}

export default Menu;