import React, { useState } from 'react';

import styles from './sidebar.module.scss';
import { FaBuilding } from 'react-icons/fa';
import {
  FaHome,
  FaUserFriends,
  FaCalendarAlt,
  FaPlane,
  FaMoneyBillWave,
  FaCog,
  FaChartBar,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


function Sidebar() {
    const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => setExpanded(!expanded);
  return (
    <div className={`${styles.sidebar} ${expanded ? styles.expanded : styles.collapsed}`}>
      <div className={styles.logo} onClick={toggleSidebar}>
  <FaBuilding className={styles.logoIcon} />
  {expanded && <span>HRMS Portal</span>}
</div>

      <nav className={styles['nav-items']}>
        <NavItem icon={<FaHome />} text="Overview" expanded={expanded} />
        <NavItem icon={<FaUserFriends />} text="Employee Management" expanded={expanded}path='/employee' />
        <NavItem icon={<FaCalendarAlt />} text="Attendance" expanded={expanded} />
        <NavItem icon={<FaPlane />} text="Leave" expanded={expanded} />
        <NavItem icon={<FaMoneyBillWave />} text="Payroll" expanded={expanded} />
        <NavItem icon={<FaCog />} text="Settings" expanded={expanded} />
        <NavItem icon={<FaChartBar />} text="Report" expanded={expanded} />
      </nav>

      <div className={styles.logout}>
        <FaSignOutAlt className={styles['logout-icon']} />
        {expanded && <span>Logout</span>}
      </div>
    </div>
  );
}

const NavItem = ({ icon, text, expanded, path }) => {
    const navigate = useNavigate();
  
    const handleClick = () => {
      if (path) navigate(path);
    };
  
    return (
      <div className={styles['nav-item']} onClick={handleClick}>
        {icon}
        {expanded && <span>{text}</span>}
      </div>
);
}

export default Sidebar;
