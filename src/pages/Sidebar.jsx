import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../css/Sidebar.css";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={toggleSidebar}>
        {isOpen ? "✕" : "☰"}
      </button>

      {/* Sidebar */}
      <aside className={`fixed-sidebar ${isOpen ? "open" : ""}`}>
        {/* Header */}
        <div className="sidebar-header">
          <h2 className="sidebar-heading">Task Flow</h2>
        </div>

        {/* Navigation */}
        <nav className="sidebar-navigation">
          <ul className="nav-links">
            <li>
              <NavLink
                to="/"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                User Management
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/tasks"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Task Management
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard"
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                Dashboard
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;