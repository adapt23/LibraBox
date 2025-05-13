import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookForm from './BookForm';

const AddBookPage = () => (
  <div style={{ padding: 20 }}>
    <h2>Ajouter un nouveau livre</h2>
    <BookForm />
    <ToastContainer />
  </div>
);

export default AddBookPage;
