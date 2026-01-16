import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Public
import LandingPage from "./pages/public/landing/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
      </Routes>
    </Router>   
  );
}
export default App;
