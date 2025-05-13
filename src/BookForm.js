import React, { useState } from 'react';
import { toast } from 'react-toastify';

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBook = { title, author, image };

    const existingBooks = JSON.parse(localStorage.getItem('books') || '[]');
    existingBooks.push(newBook);
    localStorage.setItem('books', JSON.stringify(existingBooks));

    toast.success('Livre ajouté avec image !');
    setTitle('');
    setAuthor('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400 }}>
      <input
        type="text"
        placeholder="Titre du livre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="text"
        placeholder="Auteur"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
        style={{ width: '100%', marginBottom: 10, padding: 8 }}
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ marginBottom: 10 }}
      />
      {image && (
        <img src={image} alt="Preview" style={{ width: '100%', marginBottom: 10 }} />
      )}
      <button type="submit" style={{ padding: 10, backgroundColor: '#007bff', color: 'white' }}>
        Ajouter
      </button>
    </form>
  );
};

export default BookForm;
