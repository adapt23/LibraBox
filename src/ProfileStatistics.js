import React, { useEffect, useState } from 'react';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBtn,
  MDBTypography,
  MDBIcon,
  MDBBreadcrumb,
  MDBBreadcrumbItem
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function ProfileStatistics() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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

  return (
    <div
      className="100vh"
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
       }}
      > 
      <MDBContainer className="container py-5 h-100">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem><a href="/">Home</a></MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '20px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage
                    src="/profile.jpg"
                    className="rounded-circle"
                    fluid
                    style={{ width: '120px' }}
                  />
                </div>
                <MDBTypography tag="h4">{user ? user.name : "Chargement..."}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                {user ? user.email : "..."} <span className="mx-2">|</span>
                  <a href="#!">{user ? user.number : "..."}</a>
                </MDBCardText>

                <div className="mb-4 pb-2">
                  <MDBBtn outline floating><MDBIcon fab icon="facebook" size="lg" /></MDBBtn>
                  <MDBBtn outline floating className="mx-1"><MDBIcon fab icon="twitter" size="lg" /></MDBBtn>
                  <MDBBtn outline floating><MDBIcon fab icon="skype" size="lg" /></MDBBtn>
                </div>

                {/* <MDBBtn rounded size="lg">Message now</MDBBtn> */}

                <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Livre</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">{user ? user.datalastpurshis : "..."}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Date D'achat</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">{user ? user.datalastpurshis : "..."}</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Date Retour</MDBCardText>
                  </div>
                </div>
                {user?.role === "admin" && (
                <div>
                <h5 className="text-success">👑 Admin Panel</h5>
                  <p>Bienvenue, administrateur !</p>
                  <MDBBtn color="danger" onClick={() => navigate("/admin/users")}>
                    Gérer les utilisateurs
                  </MDBBtn>
                </div>
                 )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
