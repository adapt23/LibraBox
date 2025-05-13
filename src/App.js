import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Home from "./Home";
import ProfileStatistics from "./ProfileStatistics";
import UserList from "./UserList";
import SellBookPage from "./SellBookPage"; // ✅ Import here
import PanierPage from "./PanierPage";
import BookDetailPage from './BookDetailPage';
import ContactPage from './ContactPage'
import AboutPage from './AboutPage';
import ProcessView from "./ProcessView";
import AddBookPage from "./AddBookPage";
import BookListPage from "./BookListPage";


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
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/ProfileStatistics" element={<ProfileStatistics />} />
        <Route path="/sellbook" element={<SellBookPage />} /> {/* ✅ New route added */}
        <Route path="/panier" element={<PanierPage />} />
        <Route path="/bookdetail" element={<BookDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/process" element={<ProcessView />} />
        <Route path="/addBook" element={<AddBookPage />} />
        <Route path="/bookList" element={<BookListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
