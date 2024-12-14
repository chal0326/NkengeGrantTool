import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Grants from './pages/Grants';
import GrantSections from './pages/GrantSections';
import Applications from './pages/Applications';
import EditApplication from './pages/EditApplication';
import Finance from './pages/Finance';
import Projects from './pages/Projects';
import Team from './pages/Team';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <main className="md:pl-64 flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/grants" element={<Grants />} />
            <Route path="/grant-sections" element={<GrantSections />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/applications/:grantId/edit" element={<EditApplication />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;