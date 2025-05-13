
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBTypography,
  
  } from 'mdb-react-ui-kit';
  import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
  
  export default function ProcessView() {
  
  
  
  
    const statsData = [
      { name: 'Jan', users: 30 },
      { name: 'Fév', users: 45 },
      { name: 'Mar', users: 60 },
      { name: 'Avr', users: 50 },
      { name: 'Mai', users: 70 }
    ];
  
    const topBooks = ['Harry Potter', 'Le Petit Prince', '1984'];
  
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
        <MDBContainer className="py-5">
          <MDBTypography tag="h2" className="text-center mb-5 text-white">PROCESS</MDBTypography>
  
          {/* Notifications */}
          <MDBRow className="mb-4">
          
  
            {/* Statistiques */}
            <MDBCol md="12">
              <MDBCard style={{ backgroundColor: '#f2e8dc', borderRadius: '20px' }}>
                <MDBCardBody>
                  
                  <p><strong>Objectif :</strong> Fournir des rapports sur l’utilisation de la plateforme.</p>
  
                  <ul>
                    <li><strong>Livres empruntés :</strong> 124</li>
                    <li><strong>Livres populaires :</strong> {topBooks.join(', ')}</li>
                    <li><strong>Utilisateurs actifs :</strong></li>
                  </ul>
  
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
  
                  <ul className="mt-3">
                    <li><strong>Paiements mensuels :</strong> 250€</li>
                    <li><strong>Abonnements actifs :</strong> 32</li>
                  </ul>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
  