import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';
import styles from './Layout/Navbar.module.css';

const Navbar: React.FC = () => {
  const { user, signOut } = useAuthenticator();

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>
        <span className={styles.logo}>🧑‍🍳</span>
        <h1 className={styles.title}>AI Chef Assistant</h1>
      </div>
      <div className={styles.userSection}>
        <span className={styles.username}>
          Welcome, {user?.username}
        </span>
        <button 
          onClick={signOut} 
          className={styles.signOutButton}
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;