// import React, { useState, useEffect } from 'react';
// import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Slide } from '@mui/material';
// import { styled } from '@mui/system';
// import { makeStyles } from '@mui/styles';


// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

// const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
//   backgroundColor: '#3f51b5',
//   color: 'white',
//   padding: '15px 20px',
//   borderTopLeftRadius: '8px',
//   borderTopRightRadius: '8px',
// }));

// const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
//   padding: '20px 30px',
// }));

// const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
//   padding: '15px 20px',
// }));

// const ButtonStyled = styled(Button)(({ theme }) => ({
//   borderRadius: '20px',
//   padding: '8px 20px',
//   '&:hover': {
//     backgroundColor: '#3f51b5',
//     color: 'white',
//   },
// }));

// export default function EditEmployeeDialog({ open, handleClose, employeeData, handleEditEmployee }) {
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');
//   const [contact, setContact] = useState('');

//   useEffect(() => {
//     if (employeeData) {
//       setName(employeeData.name);
//       setPosition(employeeData.position);
//       setContact(employeeData.contact);
//     }
//   }, [employeeData]);

//   const handleSubmit = () => {
//     if (!name || !position || !contact) {
//       alert('All fields are required!');
//       return;
//     }
//     const updatedEmployee = { name, position, contact };
//     handleEditEmployee(updatedEmployee);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
//       <DialogTitleStyled>Edit Employee</DialogTitleStyled>
//       <DialogContentStyled>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//         <TextField
//           label="Position"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//         <TextField
//           label="Contact"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//       </DialogContentStyled>
//       <DialogActionsStyled>
//         <ButtonStyled onClick={handleClose} color="secondary">
//           Cancel
//         </ButtonStyled>
//         <ButtonStyled onClick={handleSubmit} color="primary">
//           Save
//         </ButtonStyled>
//       </DialogActionsStyled>
//     </Dialog>
//   );
// }



import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Slide } from '@mui/material';
import { styled } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitleStyled = styled(DialogTitle)(({ theme }) => ({
  backgroundColor: '#3f51b5',
  color: 'white',
  padding: '15px 20px',
  borderTopLeftRadius: '8px',
  borderTopRightRadius: '8px',
}));

const DialogContentStyled = styled(DialogContent)(({ theme }) => ({
  padding: '20px 30px',
}));

const DialogActionsStyled = styled(DialogActions)(({ theme }) => ({
  padding: '15px 20px',
}));

const ButtonStyled = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: '8px 20px',
  '&:hover': {
    backgroundColor: '#3f51b5',
    color: 'white',
  },
}));

// const EditEmployeeDialog = ({ open, handleClose, employeeData, handleEditEmployee }) => {
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');
//   const [contact, setContact] = useState('');

//   useEffect(() => {
//     if (employeeData) {
//       setName(employeeData.name);
//       setPosition(employeeData.position);
//       setContact(employeeData.contact);
//     }
//   }, [employeeData]);

//   const handleSubmit = () => {
//     if (!name || !position || !contact) {
//       alert('All fields are required!');
//       return;
//     }
//     const updatedEmployee = { ...employeeData, name, position, contact };
//     handleEditEmployee(updatedEmployee);
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
//       <DialogTitleStyled>Edit Employee</DialogTitleStyled>
//       <DialogContentStyled>
//         <TextField
//           label="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//         <TextField
//           label="Position"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//         <TextField
//           label="Contact"
//           value={contact}
//           onChange={(e) => setContact(e.target.value)}
//           fullWidth
//           margin="dense"
//           variant="outlined"
//         />
//       </DialogContentStyled>
//       <DialogActionsStyled>
//         <ButtonStyled onClick={handleClose}>Cancel</ButtonStyled>
//         <ButtonStyled onClick={handleSubmit}>Save</ButtonStyled>
//       </DialogActionsStyled>
//     </Dialog>
//   );
// };

// export default EditEmployeeDialog;



const EditEmployeeDialog = ({ open, handleClose, employeeData, handleEditEmployee }) => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    if (employeeData) {
      // Set initial values when employeeData is provided
      setName(employeeData.name);
      setPosition(employeeData.position);
      setContact(employeeData.contact);
    }
  }, [employeeData]);

  const handleSubmit = () => {
    if (!name || !position || !contact) {
      alert('All fields are required!');
      return;  // Exit if validation fails
    }

    const updatedEmployee = { ...employeeData, name, position, contact }; // Merge updated data with existing employee
    
    // Directly call handleEditEmployee inside the onClick function
    handleEditEmployee(updatedEmployee);  // Send the updated data to the parent component
  };

  return (
    <Dialog open={open} onClose={handleClose} TransitionComponent={Transition} keepMounted fullWidth maxWidth="sm">
      <DialogTitleStyled>Edit Employee</DialogTitleStyled>
      <DialogContentStyled>
        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update name field
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Position"
          value={position}
          onChange={(e) => setPosition(e.target.value)} // Update position field
          fullWidth
          margin="dense"
          variant="outlined"
        />
        <TextField
          label="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)} // Update contact field
          fullWidth
          margin="dense"
          variant="outlined"
        />
      </DialogContentStyled>
      <DialogActionsStyled>
        <ButtonStyled onClick={handleClose}>Cancel</ButtonStyled>
        {/* Call handleSubmit here */}
        <ButtonStyled onClick={handleSubmit}>Save</ButtonStyled> 
      </DialogActionsStyled>
    </Dialog>
  );
};export default EditEmployeeDialog;

