import React, { useEffect, useState } from 'react';

const BookListPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('books') || '[]');
    setBooks(stored);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Liste des Livres</h2>
      {books.length === 0 ? (
        <p>Aucun livre ajouté.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {books.map((book, index) => (
            <li key={index} style={{ background: '#eee', padding: 10, marginBottom: 10 }}>
              {book.image && (
                <img src={book.image} alt={book.title} style={{ width: 100, marginBottom: 10 }} />
              )}
              <div><strong>{book.title}</strong></div>
              <div>{book.author}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookListPage;
