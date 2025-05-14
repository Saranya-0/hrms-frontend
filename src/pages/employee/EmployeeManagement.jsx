import React, { useEffect, useState } from 'react';
import styles from '../employee/Employee.module.scss';
import { Input } from '../../Components/Input';
import { Button } from '../../Components/Button';
import { useForm } from 'react-hook-form';
import { FaPlus, FaEdit, FaBan } from 'react-icons/fa';
import { createEmployeeAPI ,getAllEmployeesAPI, updateEmployeeAPI, deleteEmployeeAPI} from '../../services/employeeAPI';

function EmployeeManagement() {
  const [approvalData, setApprovalData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [employeeList, setEmployeeList] = useState([]);
 const [editingEmployeeId, setEditingEmployeeId] = useState(null);



  const fetchEmployees=async()=>{
    try{
      const response = await getAllEmployeesAPI();
      if (response.status ===200){
         setEmployeeList(response.data.data);

      }
    
    }catch(error){
      console.error('Error fetching employees:', error);

    }
  }
   useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle form submit (create or update)


   const onSubmit = async (data) => {
    try {
      if (editingEmployeeId) {
        const response = await updateEmployeeAPI(editingEmployeeId, data);
        if (response.status === 200) {
          fetchEmployees();
          reset();
          setShowForm(false);
          setEditingEmployeeId(null);
        }
      } else {
        const response = await createEmployeeAPI(data);
        if (response.status === 201) {
          fetchEmployees();
          reset();
          setShowForm(false);
        }
      }
    } catch (error) {
      alert('Failed to save employee: ' + (error.response?.data?.error || error.message));
    }
  };

   // Handle edit
   const handleEdit = (emp) => {
    reset(emp); 
    setEditingEmployeeId(emp._id);
    setShowForm(true);
  };

   const handleCancelEdit = () => {
    reset();
    setEditingEmployeeId(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
  if (window.confirm("Are you sure you want to delete this employee?")) {
    try {
      const response = await deleteEmployeeAPI(id);
      if (response.status === 200) {
        alert("Employee deleted successfully");
        fetchEmployees(); 
      }
    } catch (error) {
      alert("Failed to delete employee: " + (error.response?.data?.error || error.message));
    }
  }
};


  return (
    <div className={styles.employeeManagementContainer}>
      <div className={styles.approvalBoxWrapper}>
        <div className={styles.approvalBox}>
          <div className={styles.header}>
            <h2 className={styles.heading}>Approval</h2>
          </div>
          <div className={styles.tableContainer}>
            <table className={styles.approvalTable}>
              <thead>
                <tr className={styles.headerRow}>
                  <th>DATE OF APPLICATION</th>
                  <th>APPLICATION TYPE</th>
                  <th>DURATION</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {approvalData.length > 0 ? (
                  approvalData.map((item, index) => (
                    <tr key={index} className={styles.dataRow}>
                      <td>{item.date}</td>
                      <td>{item.type}</td>
                      <td>{item.duration}</td>
                      <td className={styles[item.status.toLowerCase()]}>
                        {item.status}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noData}>
                      No approval data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className={styles.footer}>
            <div className={styles.legend}>
              <span className={`${styles.legendItem} ${styles.approved}`}></span> Approved
              <span className={`${styles.legendItem} ${styles.rejected}`}></span> Rejected
              <span className={`${styles.legendItem} ${styles.pending}`}></span> Pending
            </div>
          </div>
        </div>
     

        {/* Employee Management Section */}


       <div className={styles.createCard}>
  <div className={styles.cardHeader}>
    <h3>Employee</h3>
    <Button
              onClick={() => {
                setShowForm(!showForm);
                reset();
                setEditingEmployeeId(null); // reset editing mode on toggle
              }}
              className={styles.plusButton}
            >
              <FaPlus />
    </Button>
  </div>

  {showForm && (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="Enter name"
        register={register('name', { required: 'Name is required' })}
        errors={errors.name?.message}
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="Enter email"
        register={register('email', { required: 'Email is required' })}
        errors={errors.email?.message}
      />

       <Input
                label="Position"
                name="position"
                type="text"
                placeholder="Enter position"
                register={register('position', { required: 'Position is required' })}
                errors={errors.position?.message}
              />
              <Input
                label="Salary"
                name="salary"
                type="number"
                placeholder="Enter salary"
                register={register('salary', { required: 'Salary is required' })}
                errors={errors.salary?.message}
              />


      <div className={styles.buttonRow}>
        <Button type="submit" className={styles.submitButton}>
                  {editingEmployeeId ? 'Update' : 'Create'}
                </Button>
                {editingEmployeeId && (
                  <Button type="button" className={styles.cancelButton} onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                )}
      </div>
    </form>
  )}
</div>

        </div>



         {/* Display Employee Cards */}
         <div className={styles.employeeTableSection}>
          <h3 className={styles.tableTitle}>Employee List</h3>
          <div className={styles.tableContainer}>
            <table className={styles.employeeTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Salary</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employeeList.length > 0 ? (
                  employeeList.map((emp) => (
                    <tr key={emp._id}>
                      <td>{emp.name}</td>
                      <td>{emp.email}</td>
                      <td>{emp.position}</td>
                      <td>₹{emp.salary}</td>
                      <td>
                        <button
                          className={styles.iconButton}
                          title="Edit"
                          onClick={() => handleEdit(emp)}>
                          <FaEdit />
                        </button>
             <button
               className={styles.iconButton}
               title="Delete"
                onClick={() => handleDelete(emp._id)}
               style={{ marginLeft: '8px' }}>
               <FaBan />
              </button>

                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No employees found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    
    
  );
}

export default EmployeeManagement;
