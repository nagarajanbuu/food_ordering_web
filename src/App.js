import React, { useState } from 'react';
import './App.css';
import foods from './foods.json';

function App() {
  const [category, setCategory] = useState('Fast Food');
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0); // To track the discount

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  const handleAddToCart = (food) => {
    setCart([...cart, food]);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = cart.filter((item, i) => i !== index);
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce((total, food) => total + food.price, 0);
    return total - (total * discount); // Apply discount
  };

  const saveCart = () => {
    fetch('http://localhost:5000/save_cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cart }),
    })
      .then(response => response.json())
      .then(data => {
        alert(data.message || 'Cart saved successfully!');
      })
      .catch((error) => {
        alert('Failed to save cart:', error);
      });
  };

  const handleApplyCoupon = () => {
    // Check if the coupon is valid (for example, 'DISCOUNT10' for 10% off)
    if (coupon === 'DISCOUNT10') {
      setDiscount(0.10); // 10% discount
      alert('Coupon applied! You get a 10% discount.');
    } else {
      setDiscount(0); // Reset discount if coupon is invalid
      alert('Invalid coupon code.');
    }
  };

  const renderFoodItems = (category) => {
    const foodCategory = foods[category];
    if (!foodCategory) {
      return <div>No items found for this category.</div>;
    }

    if (Array.isArray(foodCategory)) {
      return (
        <div className="food-grid">
          {foodCategory.map((food) => (
            <div className="food-item" key={food.id}>
              <img src={`/images/${food.image}`} alt={food.name} className="food-image" />
              <div className="food-info">
                <h3>{food.name}</h3>
                <p>₹ {food.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(food)}>
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (typeof foodCategory === 'object') {
      return Object.keys(foodCategory).map((subCategory) => (
        <div key={subCategory}>
          <h3>{subCategory}</h3>
          <div className="food-grid">
            {foodCategory[subCategory].map((food) => (
              <div className="food-item" key={food.id}>
                <img src={`/images/${food.image}`} alt={food.name} className="food-image" />
                <div className="food-info">
                  <h3>{food.name}</h3>
                  <p>₹ {food.price}</p>
                  <button className="add-to-cart" onClick={() => handleAddToCart(food)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ));
    }

    return <div>No items found for this category.</div>;
  };

  return (
    <div className="App">
      <div className="category-buttons">
        <button onClick={() => handleCategoryChange('Fast Food')}>Fast Food</button>
        <button onClick={() => handleCategoryChange('Chinese')}>Chinese</button>
        <button onClick={() => handleCategoryChange('Desserts')}>Desserts</button>
        <button onClick={() => handleCategoryChange('Juices')}>Juices</button>
      </div>

      <div className="food-container">
        {renderFoodItems(category)}
      </div>

      <div className="cart-summary">
        <h3>Your Cart</h3>
        {cart.length > 0 ? (
          <div>
            <ul>
              {cart.map((item, index) => (
                <li key={index}>
                  {item.name} - ₹ {item.price}
                  <button 
                    className="remove-from-cart" 
                    onClick={() => handleRemoveFromCart(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className="total-price">
              <strong>Total: ₹ {calculateTotalPrice()}</strong>
            </div>

            {/* Coupon Section */}
            <div className="coupon-section">
              <input
                type="text"
                placeholder="Enter Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
              <button onClick={handleApplyCoupon}>Apply Coupon</button>
            </div>

            <button onClick={saveCart}>Save Cart</button>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
}

export default App;
