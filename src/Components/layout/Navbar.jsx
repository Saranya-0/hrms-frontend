import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from './Navbar.module.scss';



function Navbar({ expanded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <nav
  className={`
    ${styles.navbar} 
    ${darkMode ? styles.dark : styles.light}
  `}
>
  <div className={`${expanded ? styles.innerExpanded : styles.innerCollapsed}`}>
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input type="search" placeholder="Search..." />
        <FaSearch className={styles.icon} />
      </div>
      <span className={styles.dateBadge}>
        {new Date().toLocaleDateString("en-GB")}
      </span>
    </div>

    <div className={styles.rightIcons}>
      <button onClick={() => setDarkMode(!darkMode)} className={styles.toggleBtn}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className={styles.userMenu}>
        <FaUserCircle className={styles.avatar} onClick={() => setIsOpen(!isOpen)} />
        {isOpen && (
          <div className={styles.dropdown}>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
            <Logout />
          </div>
        )}
      </div>
    </div>
  </div>
</nav>
  );
}

export default Navbar;
