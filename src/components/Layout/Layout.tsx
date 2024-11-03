import React, { useState } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('generate');

  // Function to render the appropriate component based on activePage
  const renderContent = () => {
    switch (activePage) {
      case 'generate':
        return children;
      case 'ingredients':
        return <div>My Ingredients Page</div>;
      case 'saved':
        return <div>Saved Recipes Page</div>;
      case 'profile':
        return <div>Profile Page</div>;
      default:
        return children;
    }
  };

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage}
        />
        <main className={styles.main}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Layout;