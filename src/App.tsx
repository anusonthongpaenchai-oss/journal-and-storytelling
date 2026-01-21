import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Not found
import NotFound from "./components/layout/NotFound";

// Public
import LandingPage from "./pages/public/LandingPage";
import PostPage from "./pages/public/landing/PostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
export default App;
