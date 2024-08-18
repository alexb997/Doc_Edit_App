import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './components/Editor';
import Login from './components/Login'; // Optional
import Signup from './components/Signup'; // Optional

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/editor/:documentId" element={<Editor />} />
        <Route path="/signup" element={<Signup />} /> {/* Optional */}
      </Routes>
    </Router>
  );
}

export default App;
