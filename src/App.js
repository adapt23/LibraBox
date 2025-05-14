import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar"; // ✅ Importation du composant Navbar

import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Home from "./Home";
import ProfileStatistics from "./ProfileStatistics";
import UserList from "./UserList";
import SellBookPage from "./SellBookPage";
import PanierPage from "./PanierPage";
import BookDetailPage from './BookDetailPage';
import ContactPage from './ContactPage';
import AboutPage from './AboutPage';
import ProcessView from "./ProcessView";
import AddBookPage from "./AddBookPage";
import BookListPage from "./BookListPage";
import Notifications from "./Notifications";
const ConfirmationPage = () => (
  <div className="container text-center mt-5">
    <h2>Inscription réussie ! 🎉</h2>
    <p>Vous pouvez maintenant vous connecter.</p>
    <a href="/" className="btn btn-primary">Aller à la connexion</a>
  </div>
);

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ Navbar affichée en haut */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/ProfileStatistics" element={<ProfileStatistics />} />
        <Route path="/sellbook" element={<SellBookPage />} />
        <Route path="/panier" element={<PanierPage />} />
        <Route path="/bookdetail" element={<BookDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessView />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/bookList" element={<BookListPage />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
