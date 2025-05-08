import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; 
import styles from '../layout/Layout.module.scss';

function Layout() {
    const [expanded, setExpanded] = useState(true);

    return (
      <div className={styles.layout}>
        <Sidebar expanded={expanded} setExpanded={setExpanded} />
        <div className={styles.main}>
          {/* Including the Navbar here so it appears on all routes */}
          {/* <Navbar expanded={expanded} /> */}
          <div className={styles.content}>
            <Outlet /> 
          </div>
        </div>
      </div>
    );
}

export default Layout;
