
import React, { useEffect, useState } from 'react';
import '../pages/css/home.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import EditEmployeeDialog from '../components/editdialogue';  
import DeleteConfirmationDialog from '../components/deletedialogue'; 
import AlertDialog from '../components/Dialogue';  

const Home = () => {
  const [employee, setEmployee] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('/getEmployee', {
          headers: { authorization: `Bearer ${token}` }
        });
        
        
        setEmployee(response.data.emp);
      } catch (error) {
        console.error("Error fetching employee data:", error);
        
        
      }
    };
    if (token) {
      fetchEmployees();
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const openAddEmployeeForm = () => setOpenAdd(true);

  const handleEditEmployee = async (data) => {
    setEditEmployee(data); 
    setOpenEdit(true); 
  };

  const handleUpdateEmployee = async (updatedData) => {
    try {
      const { _id, name, position, contact } = updatedData;
      await axios.put(`/updateEmployee/${_id}`, { name, position, contact }, {
        headers: { authorization: `Bearer ${token}` },
      });
      
      setEmployee((prevEmployees) =>
        prevEmployees.map((emp) =>
          emp._id === _id ? { ...emp, ...updatedData } : emp
        )
      );
      setOpenEdit(false); 
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };



  

  const handleDeleteEmployee = (emp) => {
    setEmployeeToDelete(emp._id);
    setOpenDelete(true);
  };

 

  const handleAddEmployee = async (data) => {
    try {
      
        await axios.post('/addEmployee', data, {
            headers: { authorization: `Bearer ${token}` }
        });

       
        const response = await axios.get('/getEmployee', {
            headers: { authorization: `Bearer ${token}` }
        });
        setEmployee(response.data.emp);

       
        setOpenAdd(false);
    } catch (error) {
        console.error("Error adding employee:", error);
    }
};


  const handleConfirmDelete = async () => {
    try {

        await axios.delete(`/deleteEmployee/${employeeToDelete}`, {
            headers: { authorization: `Bearer ${token}` }
        });

       
        setEmployee(employee.filter(emp => emp._id !== employeeToDelete));

        
        setOpenDelete(false);
    } catch (error) {
        console.error("Error deleting employee:", error);
    }
};


  return (
    <div className="employee-container">
      <h2 className="table-title">Employee Table</h2>
      <div className="buttons-container">
        <button onClick={openAddEmployeeForm} className="add-employee-button">Add Emp</button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>
      
     
      <AlertDialog open={openAdd} handleClose={() => setOpenAdd(false)} handleAddEmployee={handleAddEmployee} />
      
     
      <EditEmployeeDialog 
        open={openEdit} 
        handleClose={() => setOpenEdit(false)} 
        employeeData={editEmployee} 
        handleEditEmployee={handleUpdateEmployee}
      />
      
      
      <DeleteConfirmationDialog 
        open={openDelete} 
        handleClose={() => setOpenDelete(false)} 
        handleConfirmDelete={handleConfirmDelete} 
      />

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Contact</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employee.length > 0 ? (
            employee.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.position}</td>
                <td>{emp.contact}</td>
                <td>
                  <button onClick={() => handleEditEmployee(emp)} className="edit-button">Edit</button>
                  <button onClick={() => handleDeleteEmployee(emp)} className="delete-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;

