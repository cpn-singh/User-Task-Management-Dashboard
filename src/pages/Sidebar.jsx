import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../css/Sidebar.css';
import  logo from "../assets/lightning_8650972.png";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);
  const openMenu = () => setIsOpen(true);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div onMouseLeave={closeMenu} className="sidebar-container">
      {/* Trigger Button */}
      <button 
        onClick={openMenu} 
        className={`menu-trigger-btn ${isOpen ? 'btn-hidden' : 'btn-visible'}`}
        aria-label="Open navigation menu"
        aria-expanded={isOpen}
        aria-controls="sidebar-panel"
      >
        <img src={logo} className="lightning-icon" alt="Open Menu" />
      </button>

      {/* Slide Panel */}
      <div 
        id="sidebar-panel"
        className={`slide-panel ${isOpen ? 'panel-open' : 'panel-closed'}`}
        aria-hidden={!isOpen}
      >
        <button 
          className="panel-header border-none bg-transparent cursor-pointer w-full text-left p-0" 
          onClick={closeMenu}
          aria-label="Close navigation menu"
        >
          <img src="src/assets/lightning_8650972.png" className="lightning-icon" alt="Logo" />
          <h2 className="sidebar-heading">Task Flow</h2>
        </button>

        <nav className="sidebar-navigation">
          <ul className="nav-links list-none">
            <li><Link onClick={closeMenu} to="/">User Management</Link></li>
            <li><Link onClick={closeMenu} to="/tasks">Task Management</Link></li>
            <li><Link onClick={closeMenu} to="/dashboard">Dashboard</Link></li>
          </ul>
        </nav>
      </div>
      
      {/* Optional: Overlay to close when clicking outside */}
      {isOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

export default Sidebar;

