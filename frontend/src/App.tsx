import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddNIM from './components/AddNIM';
import UseNIM from './components/UseNIM';

function App() {
  return (
<Router>
  <div>
    <Navbar />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add" element={<AddNIM />} />
      <Route path="/use" element={<UseNIM />} />
    </Routes>
  </div>
</Router>
  );
}

export default App;
