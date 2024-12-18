import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { toast } from 'react-hot-toast';

export default function AlertDialog({ handleClose, open, handleAddEmployee }) {
    
    const [name, setName] = React.useState('');
    const [position, setPosition] = React.useState('');
    const [contact, setContact] = React.useState('');
    
    const phoneNumberRegex = /^(\+?\d{1,4})?[\s.-]?\(?\d{1,4}?\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}$/;

    const validation = () => {
        let isValid = true;

        if (!name) {
            toast.error('Name is required');
            isValid = false;
        }
        if (!position) {
            toast.error('Position is required');
            isValid = false;
        }
        if (!phoneNumberRegex.test(contact)) {
            toast.error('Phone number must be at least 10 digits');
            isValid = false;
        }

        return isValid;  
    }

    const handleSubmit = () => {
       
        if (validation()) {
            handleAddEmployee({ name, position, contact });
            setName('');
            setPosition('');
            setContact('');
            handleClose(); 
        }
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Employee Form"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <form>
                            <div>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}  
                                    placeholder="Name"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={position}
                                    onChange={(e) => setPosition(e.target.value)}  
                                    placeholder="Position"
                                />
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={contact}
                                    onChange={(e) => setContact(e.target.value)}  
                                    placeholder="Contact"
                                />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit} autoFocus>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
