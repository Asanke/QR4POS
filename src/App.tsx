import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import MerchantControl from './pages/MerchantControl';
import Reports from './pages/Reports';
import Audit from './pages/Audit';
import UserManagement from './pages/UserManagement';
import Disputes from './pages/Disputes';

export default function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  return (
    <Router>
      <div className={`flex min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <Sidebar isCollapsed={isSidebarCollapsed} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            toggleSidebar={toggleSidebar} 
            isDarkMode={isDarkMode} 
            toggleDarkMode={toggleDarkMode} 
          />
          <main className="p-8 flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/merchants" element={<MerchantControl />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/audit" element={<Audit />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/disputes" element={<Disputes />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
