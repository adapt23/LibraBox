import React from 'react';
import { useLocation } from 'react-router-dom';

const BookDetailPage = () => {
  const location = useLocation();
  const { book, review, user } = location.state || {};

  if (!book) return <p>Pas de détails disponibles.</p>;

  return (
    <div className="container py-4">
      <h2>Détail du Livre</h2>
      <div className="card p-4 shadow">
        <h3>{book.title}</h3>
        <p><strong>Auteur:</strong> {book.author}</p>
        <p><strong>Prix:</strong> ${book.price.toFixed(2)}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <hr />
        <h4>Avis Utilisateur</h4>
        {review ? (
          <>
            <p><strong>Note:</strong> {review.rating} ⭐</p>
            <p><strong>Commentaire:</strong> {review.comment}</p>
            <p><strong>Utilisateur:</strong> {user?.username}</p>
          </>
        ) : (
          <p>Aucun avis pour ce livre.</p>
        )}
      </div>
    </div>
  );
};

export default BookDetailPage;
