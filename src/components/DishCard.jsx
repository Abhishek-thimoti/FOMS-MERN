import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

function DishCard({ dish }) {
  const { addToCart } = useContext(AppContext);

  return (
    <div className="dish-card">
      <div className="image-container">
        <img src={dish.image} alt={dish.name} />
        <div className="nutrition-overlay">
          <p><strong>Calories:</strong> {dish.nutrition?.calories || 'N/A'}</p>
          <p><strong>Protein:</strong> {dish.nutrition?.protein || 'N/A'}</p>
          <p><strong>Carbs:</strong> {dish.nutrition?.carbs || 'N/A'}</p>
        </div>
      </div>
      <div className="dish-info">
        <h3>{dish.name}</h3>
        <span className={`badge ${dish.type === 'veg' ? 'veg' : 'non-veg'}`}>
          {dish.type === 'veg' ? 'Veg' : 'Non-Veg'}
        </span>
        <p className="price">₹{Number(dish.price).toFixed(2)}</p>
        <button className="add-btn" onClick={() => addToCart(dish)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default DishCard;