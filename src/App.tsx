import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Not found
import NotFound from "./components/layout/NotFound";

// Public
import LandingPage from "./pages/public/LandingPage";
import PostPage from "./pages/public/landing/PostPage";
import LogInPage from "./pages/public/auth/LoginPage";
import SignUpPage from "./pages/public/auth/SignupPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
