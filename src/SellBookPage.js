import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import "./styles/sell.css";

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 10.99, genre: 'Classic',stock: 5  },
  { id: 2, title: '1984', author: 'George Orwell', price: 9.99, genre: 'Dystopian' ,stock: 5},
  { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 12.49, genre: 'Fiction',stock: 5 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 8.99, genre: 'Romance' ,stock: 5},
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 11.99, genre: 'Classic',stock: 5 },
  { id: 6, title: 'Brave New World', author: 'Aldous Huxley', price: 10.49, genre: 'Science Fiction' ,stock: 5},
  { id: 7, title: 'Moby Dick', author: 'Herman Melville', price: 9.49, genre: 'Adventure' ,stock: 5},
  { id: 8, title: 'War and Peace', author: 'Leo Tolstoy', price: 14.99, genre: 'Historical',stock: 5 },
  { id: 9, title: 'Jane Eyre', author: 'Charlotte Brontë', price: 10.99, genre: 'Gothic' ,stock: 5},
  { id: 10, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 13.99, genre: 'Fantasy' ,stock: 5},
  { id: 11, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', price: 11.49, genre: 'Psychological',stock: 5 },
  { id: 12, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', price: 19.99, genre: 'Fantasy' ,stock: 5},
  { id: 13, title: 'Fahrenheit 451', author: 'Ray Bradbury', price: 10.99, genre: 'Dystopian' ,stock: 5},
  { id: 14, title: 'Wuthering Heights', author: 'Emily Brontë', price: 9.89, genre: 'Classic' ,stock: 5},
  { id: 15, title: 'The Picture of Dorian Gray', author: 'Oscar Wilde', price: 8.99, genre: 'Philosophical',stock: 5 },
  { id: 16, title: 'Les Misérables', author: 'Victor Hugo', price: 13.49, genre: 'Historical' ,stock: 5},
  { id: 17, title: 'Dracula', author: 'Bram Stoker', price: 9.99, genre: 'Horror',stock: 5 },
  { id: 18, title: 'The Alchemist', author: 'Paulo Coelho', price: 11.29, genre: 'Fable',stock: 5 },
  { id: 19, title: 'The Brothers Karamazov', author: 'Fyodor Dostoevsky', price: 12.99, genre: 'Philosophical' ,stock: 5},
  { id: 20, title: 'Anna Karenina', author: 'Leo Tolstoy', price: 10.89, genre: 'Romance',stock: 5 },
  { id: 21, title: 'A Tale of Two Cities', author: 'Charles Dickens', price: 9.49, genre: 'Historical',stock: 5 },
  { id: 22, title: 'Don Quixote', author: 'Miguel de Cervantes', price: 14.59, genre: 'Adventure',stock: 5 },
  { id: 23, title: 'Frankenstein', author: 'Mary Shelley', price: 10.19, genre: 'Horror',stock: 5 }
];

const SellBookPage = () => {
  const [books, setBooks] = useState(initialBooks);
  const [formData, setFormData] = useState({ title: '', author: '', price: '', genre: '',stock: '' });
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [editBookId, setEditBookId] = useState(null);
  const [editFormData, setEditFormData] = useState({ title: '', author: '', price: '' });
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [reviews, setReviews] = useState({});
  const navigate = useNavigate();
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      navigate("/LoginForm");
    } else {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      if (parsedUser.role !== "admin" && window.location.pathname === "/admin") {
        navigate("/Profile");
      }
    }
  }, [navigate]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddBook = () => {
    if (!formData.title || !formData.author || !formData.price) return;
    const newBook = {
      id: Date.now(),
      title: formData.title,
      author: formData.author,
      price: parseFloat(formData.price),
      genre: formData.genre || 'Unknown',
      stock: parseInt(formData.stock, 10)
    };
    setBooks([...books, newBook]);
    setFormData({ title: '', author: '', price: '', genre: '', stock: '' });
  };
  const handleDeleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };
  const handleBuyBook = (book) => {
    if (book.stock > 0) {
      const updatedBooks = books.map(b => 
        b.id === book.id ? { ...b, stock: b.stock - 1 } : b
      );
      setBooks(updatedBooks);
      
      const existingItem = cart.find(item => item.id === book.id);
      if (existingItem) {
        setCart(cart.map(item =>
          item.id === book.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ));
      } else {
        setCart([...cart, { ...book, quantity: 1 }]);
      }
    }
  };

  const startEdit = (book) => {
    setEditBookId(book.id);
    setEditFormData({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      stock: book.stock.toString()
    });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const saveEdit = (id) => {
    const updatedBooks = books.map((book) =>
      book.id === id
        ? { ...book, title: editFormData.title, author: editFormData.author, price: parseFloat(editFormData.price), stock: parseInt(editFormData.stock, 10) }
        : book
    );
    setBooks(updatedBooks);
    setEditBookId(null);
  };

  const cancelEdit = () => {
    setEditBookId(null);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleReviewChange = (bookId, field, value) => {
    setReviews(prev => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        [field]: value
      }
    }));
  };

  const filteredBooks = books.filter((book) => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    return (
      book.title.toLowerCase().includes(lowerCaseQuery) ||
      book.author.toLowerCase().includes(lowerCaseQuery) ||
      book.genre.toLowerCase().includes(lowerCaseQuery)
    );
  });

  return (
    <div style={{ minHeight: '100vh', backgroundImage: "url('/background libra box.png')", backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center top', color: '#fff' }}>
      <div className="container py-4">
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <strong>🛒 Panier:</strong>
          <div>
            <span>{cart.length} livre(s) - Total: ${totalPrice.toFixed(2)}</span>
            <Link to="/panier" className="btn btn-outline-light btn-sm ms-3">Voir Panier</Link>
          </div>
        </div>

        {user?.role === "admin" && (
          <div className="mb-4">
            <h4>Ajouter un nouveau livre</h4>
            <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="form-control mb-2" />
            <input type="text" name="author" placeholder="Author" value={formData.author} onChange={handleChange} className="form-control mb-2" />
            <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="form-control mb-2" />
            <input type="text" name="genre" placeholder="Genre" value={formData.genre} onChange={handleChange} className="form-control mb-2" />
            <input 
        type="number" 
        name="stock" 
        placeholder="Stock" 
        value={formData.stock} 
        onChange={handleChange} 
        className="form-control mb-2" 
      />
            <button className="btn btn-success" onClick={handleAddBook}>Ajouter Livre</button>
          </div>
        )}

        <div className="mb-4">
          <h4>Recherche</h4>
          <input type="text" name="search" placeholder="Search by title, author, or genre" value={searchQuery} onChange={handleSearchChange} className="form-control mb-3" />
        </div>

        <div className="row">
          {filteredBooks.map((book) => (
            <div className="col-md-4 mb-4" key={book.id}>
              <div className="card shadow-sm rounded-lg h-100">
                <div className="card-body d-flex flex-column">
                  {editBookId === book.id ? (
                    <>
                      <input type="text" name="title" value={editFormData.title} onChange={handleEditChange} className="form-control mb-2" />
                      <input type="text" name="author" value={editFormData.author} onChange={handleEditChange} className="form-control mb-2" />
                      <input type="number" name="price" value={editFormData.price} onChange={handleEditChange} className="form-control mb-2" />
                      <input 
          type="number" 
          name="stock" 
          value={editFormData.stock} 
          onChange={handleEditChange} 
          className="form-control mb-2" 
        />
                      <button className="btn btn-success me-2" onClick={() => saveEdit(book.id)}>Sauvegarder</button>
                      <button className="btn btn-secondary" onClick={cancelEdit}>Annuler</button>
                    </>
                  ) : (
                    <>
                      <h5 className="card-title">{book.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                      <p className="card-text">${book.price.toFixed(2)}-Stock: {book.stock}</p>
                      <div className="mt-3">
                      
                      
        <button className="btn btn-primary me-2" onClick={() => handleBuyBook(book)} disabled={book.stock <= 0}>
          {book.stock > 0 ? 'Acheter' : 'En rupture'}
        </button>
                        {user?.role === "admin" && (
                          <>
                            <button className="btn btn-warning me-2" onClick={() => startEdit(book)}>Modifier</button>
                            <button className="btn btn-danger" onClick={() => handleDeleteBook(book.id)}>Supprimer</button>
                          </>
                        )}
                      </div>
                      <hr />
                      <div>
                        <label htmlFor={`rating-${book.id}`} className="form-label">Note : {reviews[book.id]?.rating || 0} ⭐</label>
                        <input
                          type="range"
                          id={`rating-${book.id}`}
                          min="1"
                          max="5"
                          value={reviews[book.id]?.rating || 0}
                          onChange={(e) => handleReviewChange(book.id, 'rating', parseInt(e.target.value))}
                          className="form-range"
                        />
                        <textarea
                          className="form-control mt-2"
                          placeholder="Laissez un commentaire..."
                          value={reviews[book.id]?.comment || ''}
                          onChange={(e) => handleReviewChange(book.id, 'comment', e.target.value)}
                        ></textarea>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellBookPage;
