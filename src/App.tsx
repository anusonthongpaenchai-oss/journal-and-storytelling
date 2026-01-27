import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import NotFound from "./components/layout/NotFound";

// Public pages
import LandingPage from "./pages/public/landing/LandingPage";
import PostPage from "./pages/public/post/PostPage";
import LogInPage from "./pages/public/auth/LoginPage";
import SignUpPage from "./pages/public/auth/SignupPage";

// Profile pages
import ProfilePage from "./pages/profile/ProfilePage";
import ResetPasswordPage from "./pages/profile/ResetPasswordPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/login" element={<LogInPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        {/* Profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/resetPassword" element={<ResetPasswordPage/>}/>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
