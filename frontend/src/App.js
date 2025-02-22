import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import RoomVisualizer from './pages/RoomVisualizer';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/visualize" element={<RoomVisualizer />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
