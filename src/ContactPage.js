// ContactPage.js
import React, { useState } from 'react';
import "./styles/logo.css";
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Message sent! 📩');
    setFormData({ name: '', email: '', message: '' });
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
         <Link to="/">
        <img
          src="/logo librabox.png"
          alt="Logo"
          className="left-logo"
        />
      </Link>
    
    <div className="container py-5">
      <h2 className="text-center mb-4">Contactez-Nous</h2>
      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Message</label>
          <textarea
            name="message"
            className="form-control"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>
        <button className="btn btn-primary w-100" type="submit">
          Envoyer
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactPage;
