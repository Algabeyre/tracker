import React from 'react';
import Dashboard from './components/Dashboard';
import { Activity } from 'lucide-react';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header animate-fade-in">
        <Activity size={36} color="#60a5fa" />
        <h1>Tracker</h1>
      </header>
      
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default App;
