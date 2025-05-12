
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

 

const PanierPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const navigate = useNavigate();

const handleOrderClick = () => {
  navigate('/checkout'); // Change this to your target route
};

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
       }}
      > 
      <>
        <div className="container mt-4">
      <h2>🛍️ Votre Panier</h2>
      {cart.length === 0 ? (
        <p>Votre panier est vide.</p>
      ) : (
            <>
            <ul className="list-group mb-3">
                {cart.map((item, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.title} - ${item.price.toFixed(2)}
                    <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFromCart(item.id)}>
                    Supprimer
                    </button>
                </li>
                ))}
            </ul>
            <div className="alert alert-info">
                <strong>Total: ${total.toFixed(2)}</strong>
                
                <button className="order-btn" onClick={handleOrderClick}>
                           Paiment
                </button>

                 
            </div>
            </>
      )}
        </div>
        </>
   </div>
  );
};

export default PanierPage;
