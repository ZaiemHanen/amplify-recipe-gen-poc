import React from 'react';
import styles from './Layout/Sidebar.module.css';

export interface SidebarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const menuItems = [
    { id: 'generate', icon: '🪄', label: 'Generate Recipe' },
    { id: 'ingredients', icon: '🥗', label: 'My Ingredients' },
    { id: 'saved', icon: '📚', label: 'Saved Recipes' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <div className={styles.sidebar}>
      {menuItems.map((item) => (
        <button
          key={item.id}
          className={`${styles.sidebarItem} ${
            activePage === item.id ? styles.active : ''
          }`}
          onClick={() => setActivePage(item.id)}
        >
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default Sidebar;