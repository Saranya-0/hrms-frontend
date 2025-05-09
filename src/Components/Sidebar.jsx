import React, { useState } from 'react';

import styles from './Sidebar.module.scss';

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


const navItems=[
  { icon: <FaHome />, text: 'Overview' },
  { icon: <FaUserFriends />, text: 'Employee Management', path: '/employee' },
  { icon: <FaCalendarAlt />, text: 'Attendance'},
  { icon: <FaPlane />, text: 'Leave' },
  { icon: <FaMoneyBillWave />, text: 'Payroll' },
  { icon: <FaCog />, text: 'Settings' },
  { icon: <FaChartBar />, text: 'Report' }
]


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
       {navItems.map((item,index)=>(
        <NavItem key={index}
        icon={item.icon}
        text={item.text}
        expanded={expanded}
        path={item.path}/>
       ))}
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
