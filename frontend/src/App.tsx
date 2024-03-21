import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import AddNIM from './components/AddNIM';
import UseNIM from './components/UseNIM';
import UpdateNIM from './components/UpdateNIM'; 

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddNIM />} />
          <Route path="/use/:id" element={<UseNIM />} /> 
          <Route path="/edit/:id" element={<UpdateNIM />} /> 
        </Routes>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5">
        <p><strong>Made by Noah Hicks</strong></p>
        {/* Link to NoahHicks.com */}
        My Portfolio:  
        <a href="https://noahhicks.com" target="_blank" rel="noopener noreferrer">
          NoahHicks.com
        </a>
      </footer>

    </Router>
  );
}

export default App;
