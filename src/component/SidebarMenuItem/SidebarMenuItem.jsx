import React from "react";
import "./SidebarMenuItem.css"; // For menu item specific styling

function SidebarMenuItem({ icon, text, isActive, hasSubMenu }) {
  const itemClasses = `sidebar-menu-item ${isActive ? "active" : ""}`;
  return (
    <li className={itemClasses}>
      <a href='#'>
        {" "}
        {/* In a real app, this would be a React Router Link */}
        <span className='icon'>{icon}</span>
        <span className='text'>{text}</span>
        {hasSubMenu && <span className='arrow'>›</span>}
      </a>
    </li>
  );
}

export default SidebarMenuItem;
