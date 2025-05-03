// UserList.js
import React, { useState } from "react";
import usersData from "./users.json"; // Adjust if needed
import {
  MDBContainer,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

const UserList = () => {
  // Local state to manage user list (because we can't modify imported JSON directly)
  const [users, setUsers] = useState(usersData);

  const handlePasswordChange = (id, newPassword) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, password: newPassword } : user
    );
    setUsers(updatedUsers);
  };

  const handleSave = (id) => {
    const user = users.find((u) => u.id === id);
    alert(`Password for ${user.name} updated to: ${user.password}`);
    // If needed, save to localStorage or send to backend here
  };

  return (
    <div
      className="vh-100"
      style={{
        backgroundImage: "url('/background libra box.png')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      {/* Logo */}
      <div className="p-3">
        <Link to="/">
          <img
            src="/logo librabox.png"
            alt="Logo"
            style={{ height: "200px", cursor: "pointer" }}
          />
        </Link>
      </div>

      <MDBContainer className="py-5">
        <h2 className="mb-4 text-center" style={{ color: 'white' }}>
                      Liste des Utilisateurs
        </h2>

        <MDBTable bordered>
          <MDBTableHead light>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Adresse</th>
              <th>Date</th>
              <th>Rôle</th>
              <th>Mot de passe</th>
              <th>Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.addr}</td>
                <td>{user.datalastpurshis}</td>
                <td>{user.role}</td>
                <td>
                  <input
                    type="text"
                    value={user.password}
                    onChange={(e) =>
                      handlePasswordChange(user.id, e.target.value)
                    }
                    className="form-control form-control-sm"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleSave(user.id)}
                  >
                    Save
                  </button>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>
      </MDBContainer>
    </div>
  );
};

export default UserList;
