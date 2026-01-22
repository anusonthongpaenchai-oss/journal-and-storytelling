import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Not found
import NotFound from "./components/layout/NotFound";

// Public
import LandingPage from "./pages/public/LandingPage";
import PostPage from "./pages/public/landing/post/PostPage";
import SignUpPage from "./pages/public/auth/SignupPage";
import LogInPage from "./pages/public/auth/LoginPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LogInPage />} />

        {/* Not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
