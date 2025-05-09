import React from 'react'
import styles from '../employee/Employee.module.scss';



function Approval() {
    const approvals = [
        { date: "03/07/2021", name: "Saranya", role: "Project Manager", type: "Casual Leave", duration: "02 (05-06 Jul)", status: "Pending" },
        { date: "01/07/2022", name: "Vaiga", role: "Software Developer", type: "Late Entry", duration: "01 (06 Jul)", status: "Approved" },
        { date: "27/06/2022", name: "Neha", role: "Nursing Assistant", type: "Paternity Leave", duration: "05 (05-06 Jul)", status: "Rejected" },
      ];
  return (
    <div>
     
    <div className={styles.container}>
    <h2 className={styles.title}>Approval</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>DATE</th>
          <th>APPLICANT</th>
          <th>APPLICATION TYPE</th>
          <th>DURATION</th>
          <th>STATUS</th>
        </tr>
      </thead>
      <tbody>
        {approvals.map((item, index) => (
          <tr key={index}>
            <td>{item.date}</td>
            <td>
              {item.name}
              <span className={styles.role}> ({item.role})</span>
            </td>
            <td>{item.type}</td>
            <td>{item.duration}</td>
            <td>
              <span
                className={`${styles.status} ${styles[item.status.toLowerCase()]}`}>
                {item.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </div>
  )
}

export default Approval