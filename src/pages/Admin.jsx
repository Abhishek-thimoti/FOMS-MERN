import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

function Admin() {
  const { dishes, addDish, editDish, deleteDish } = useContext(AppContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ id: null, name: '', price: '', type: 'veg', image: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      editDish(form);
    } else {
      addDish(form);
    }
    setForm({ id: null, name: '', price: '', type: 'veg', image: '' });
    setIsEditing(false);
  };

  const handleEdit = (dish) => {
    setForm(dish);
    setIsEditing(true);
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={() => navigate('/')}>Logout</button>
      </header>

      <div className="admin-content">
        <form className="admin-form" onSubmit={handleSubmit}>
          <h3>{isEditing ? 'Edit Dish' : 'Add New Dish'}</h3>
          <input type="text" name="name" placeholder="Dish Name" value={form.name} onChange={handleChange} required />
          <input type="number" name="price" placeholder="Price" step="0.01" value={form.price} onChange={handleChange} required />
          <select name="type" value={form.type} onChange={handleChange}>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
          <input type="text" name="image" placeholder="Image Path (e.g., /images/dish.jpg)" value={form.image} onChange={handleChange} required />
          <button type="submit" className="save-btn">{isEditing ? 'Update Dish' : 'Add Dish'}</button>
          {isEditing && <button type="button" className="cancel-btn" onClick={() => { setIsEditing(false); setForm({ id: null, name: '', price: '', type: 'veg', image: '' }) }}>Cancel</button>}
        </form>

        <div className="admin-dishes">
          {dishes.map((dish) => (
            <div key={dish.id} className="admin-dish-card">
              <img src={dish.image} alt={dish.name} />
              <div className="admin-dish-info">
                <h4>{dish.name}</h4>
                <p>₹{Number(dish.price).toFixed(2)} - {dish.type}</p>
              </div>
              <div className="admin-dish-actions">
                <button className="edit-btn" onClick={() => handleEdit(dish)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteDish(dish.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Admin;