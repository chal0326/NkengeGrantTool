import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Grants from './pages/Grants';
import Templates from './pages/Templates';
import Applications from './pages/Applications';
import EditApplication from './pages/EditApplication';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:grantId/edit" element={<EditApplication />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;