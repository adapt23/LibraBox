import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookForm from './BookForm';

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography
} from 'mdb-react-ui-kit';

const AddBookPage = () => (
  <div
    style={{
      backgroundImage: "url('/background libra box.png')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      minHeight: '100vh',
      padding: '40px 0',
    }}
  >
    <MDBContainer>
      <MDBTypography tag="h2" className="text-center mb-5 text-white">
        Ajouter un nouveau livre
      </MDBTypography>

      <MDBRow className="justify-content-center">
        <MDBCol md="10" lg="6">
          <MDBCard style={{ backgroundColor: '#f2e8dc', borderRadius: '20px' }}>
            <MDBCardBody>
              <BookForm />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
    <ToastContainer />
  </div>
);

export default AddBookPage;
