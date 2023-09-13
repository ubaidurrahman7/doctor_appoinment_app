// DropdownMenu.js
import React, { useState } from 'react';

const DropdownMenu = (userName) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown-menu">
      <span className="dropdown-trigger" onClick={toggleDropdown}>
        Welcome, {userName}!
        <i className={`fa fa-chevron-${isOpen ? 'up' : 'down'}`} />
      </span>
      {isOpen && (
        <div className="dropdown-content">
          <a href="/profile">Your Profile</a>
          <a href="/reports">Reports</a>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
