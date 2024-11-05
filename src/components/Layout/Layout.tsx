import React, { useState } from 'react';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import styles from './Layout.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [activePage, setActivePage] = useState<string>('generate');

  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.container}>
        <Sidebar 
          activePage={activePage} 
          setActivePage={setActivePage}
        />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;