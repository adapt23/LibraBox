import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import Dashboard from "./Dashboard";

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
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
      </Routes>
    </Router>
  );
}

export default App;