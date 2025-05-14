import React from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBListGroup,
  MDBListGroupItem,
  MDBIcon,
  MDBBadge
} from 'mdb-react-ui-kit';

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: 'info',
      message: '📚 Le livre "L’Art de la Guerre" a été ajouté à la bibliothèque.',
      date: '2025-05-13T09:30:00Z'
    },
    {
      id: 2,
      type: 'warning',
      message: '⏰ Rappel : vous devez retourner "1984" avant le 15 mai.',
      date: '2025-05-12T15:00:00Z'
    },
    {
      id: 3,
      type: 'success',
      message: '🆕 Nouveau livre disponible : "Le Petit Prince".',
      date: '2025-05-11T18:45:00Z'
    }
  ];

  const formatDate = isoString => {
    const d = new Date(isoString);
    return d.toLocaleString('fr-FR', {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const badgeColor = type => {
    switch (type) {
      case 'success': return 'success';
      case 'warning': return 'warning';
      default: return 'info';
    }
  };

  return (
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
          <MDBIcon icon="bell" className="me-2" />
          Mes Notifications
        </MDBTypography>

        <MDBRow className="justify-content-center">
          <MDBCol md="10" lg="8">
            <MDBCard style={{ backgroundColor: '#f2e8dc', borderRadius: '20px' }}>
              <MDBCardBody>
                <MDBListGroup flush>
                  {notifications.map(notif => (
                    <MDBListGroupItem
                      key={notif.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        <MDBBadge color={badgeColor(notif.type)} pill className="me-2">
                          <MDBIcon icon="bell" />
                        </MDBBadge>
                        {notif.message}
                      </div>
                      <small className="text-muted">{formatDate(notif.date)}</small>
                    </MDBListGroupItem>
                  ))}
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
