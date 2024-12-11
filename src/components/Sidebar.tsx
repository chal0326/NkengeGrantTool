import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, FileText, PenTool } from 'lucide-react';
import { Menu } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Mobile menu button */}
      <button
        className="md:hidden p-3 text-purple-800"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 transform bg-white shadow-lg h-full transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:w-64`}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold text-purple-800">Nkenge Grants</h1>
        </div>
        <nav className="mt-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                isActive ? 'bg-purple-50 text-purple-800' : ''
              }`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </NavLink>
          <NavLink
            to="/grants"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                isActive ? 'bg-purple-50 text-purple-800' : ''
              }`
            }
          >
            <Search className="w-5 h-5 mr-3" />
            Grant Search
          </NavLink>
          <NavLink
            to="/templates"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                isActive ? 'bg-purple-50 text-purple-800' : ''
              }`
            }
          >
            <FileText className="w-5 h-5 mr-3" />
            Templates
          </NavLink>
          <NavLink
            to="/applications"
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                isActive ? 'bg-purple-50 text-purple-800' : ''
              }`
            }
          >
            <PenTool className="w-5 h-5 mr-3" />
            Applications
          </NavLink>
        </nav>
      </div>

      {/* Backdrop for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
