import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar';
import Navbar from '../../Components/Navbar';
import styles from './Layout.module.scss';

function Layout({ children }) {
  const [expanded, setExpanded] = useState(true);
  

  return (
    <div className={styles.container}>
      <Sidebar expanded={expanded} />
      <div className={styles.content}>
        <Navbar expanded={expanded} /> 
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;