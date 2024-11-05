import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Layout/Sidebar.module.css';

interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const menuItems = [
    { id: 'generate', icon: '🪄', label: 'Generate Recipe', path: '/' },
    { id: 'ingredients', icon: '🥗', label: 'My Ingredients', path: '/ingredients' },
    { id: 'saved', icon: '📚', label: 'Saved Recipes', path: '/saved-recipes' },
    { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
  ];

  return (
    <div className={styles.sidebar}>
      {menuItems.map((item) => (
        <NavLink
          key={item.id}
          to={item.path}
          className={({ isActive }) => 
            `${styles.sidebarItem} ${isActive ? styles.active : ''}`
          }
          onClick={() => setActivePage(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </NavLink>
      ))}
    </div>
  );
};

export default Sidebar;