import React, { useState } from "react";
import { FaSearch, FaUserCircle, FaMoon, FaSun } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.scss";




function Navbar({ expanded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  
  
  return (
    <nav className={`${styles.nav} ${darkMode ? styles.navDark : ''}`}>
    <div className={styles.navbarContentRight}>
      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <input
            type="search"
            placeholder="Search..."
            className={styles.searchInput} 
          />
          <FaSearch className={styles.searchIcon} /> {/* Removed conditional icon color */}
        </div>
      </div>
      <span className={styles.dateBadge}>
        {new Date().toLocaleDateString("en-GB")}
      </span>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`${styles.darkModeButton} ${darkMode ? styles.dark : ''}`}
      >
        {darkMode ? (
          <FaSun className={styles.darkModeIconLight} />
        ) : (
          <FaMoon className={styles.darkModeIconDark} />
        )}
      </button>
      <div className={styles.userProfile}>
        <FaUserCircle
          className={styles.userIcon}
          onClick={() => setIsOpen(!isOpen)}
        />
        {isOpen && (
          <div className={`${styles.dropdown} ${darkMode ? styles.dropdownDark : ''}`}>
            <Link to="/signin" className={`${styles.dropdownLink} ${darkMode ? styles.dark : ''}`}>
              Sign In
            </Link>
            <Link to="/signup" className={`${styles.dropdownLink} ${darkMode ? styles.dark : ''}`}>
              Sign Up
            </Link>
            {/* <Logout className={darkMode ? 'text-white' : 'text-gray-900'} /> */}
          </div>
        )}
      </div>
    </div>
  </nav>
  );
}

export default Navbar;
