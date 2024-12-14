import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  FileText,
  PenTool,
  Menu,
  DollarSign,
  FolderOpen,
  Users,
  X
} from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const navigation = [
    // Core
    { name: 'Dashboard', to: '/', icon: LayoutDashboard },
    { name: 'Grants', to: '/grants', icon: Search },
    { name: 'Projects', to: '/projects', icon: FolderOpen },
    
    // Finance
    { name: 'Finance', to: '/finance', icon: DollarSign },
    
    // Documents
    { name: 'Grant Sections', to: '/grant-sections', icon: FileText },
    { name: 'Applications', to: '/applications', icon: PenTool },
    
    // People
    { name: 'Team', to: '/team', icon: Users },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-200 ease-in-out md:translate-x-0`}
      >
        <div className="h-full flex flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 bg-white border-b border-gray-200">
            <span className="text-xl font-semibold text-gray-800">Grant Tool</span>
            <button
              className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500"
              onClick={toggleSidebar}
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
            {/* Core Section */}
            <div className="mb-8">
              <h3 className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Core
              </h3>
              {navigation.slice(0, 3).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                      isActive ? 'bg-purple-50 text-purple-800' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Finance Section */}
            <div className="mb-8">
              <h3 className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Finance
              </h3>
              {navigation.slice(3, 4).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                      isActive ? 'bg-purple-50 text-purple-800' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Documents Section */}
            <div className="mb-8">
              <h3 className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Documents
              </h3>
              {navigation.slice(4, 6).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                      isActive ? 'bg-purple-50 text-purple-800' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* People Section */}
            <div>
              <h3 className="px-6 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                People
              </h3>
              {navigation.slice(6).map((item) => (
                <NavLink
                  key={item.name}
                  to={item.to}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-6 py-3 text-gray-700 hover:bg-purple-50 hover:text-purple-800 ${
                      isActive ? 'bg-purple-50 text-purple-800' : ''
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>
              ))}
            </div>
          </nav>
        </div>
      </div>

      {/* Backdrop for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
}
