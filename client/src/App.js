import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import UploadNote from './pages/UploadNote';
import Notes from './pages/Notes'; // import Notes page

function App() {
  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link> | <Link to="/upload">Upload Note</Link> | <Link to="/notes">View Notes</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={<UploadNote />} />
        <Route path="/notes" element={<Notes />} /> {/* Add route for Notes */}
      </Routes>
    </Router>
  );
}

export default App;
