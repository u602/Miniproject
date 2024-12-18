import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../pages/css/register.css';
import Navbar from '../components/Navbar';

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword: '',
  });

  

  const validateForm = () => {
    const newErrors = { name: '', email: '', password: '', confirmpassword: '' };
    let isValid = true;

    if (!data.name) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }
    if (!data.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(data.email)) {
        newErrors.email = 'Please enter a valid email address.';
        isValid = false;
      }
    }
    if (!data.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (data.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }
    if (data.confirmpassword !== data.password) {
      newErrors.confirmpassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const registerUser = async (e) => {
    e.preventDefault();
    setErrors({
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    });

    if (!validateForm()) return;

    try {
      const response = await axios.post('/register', data);

      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Registration Successful! Welcome!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('An error occurred during registration.');
    }
  };
  const token=localStorage.getItem('token')
  useEffect(() => {
    if(token){
      navigate('/')
    }
    else{
      navigate('/register')
    }
  },[])
  return (
    <div className="register-container">
         <Navbar/>
      <h2>Register</h2>
      <form onSubmit={registerUser}>
     
        <input
          type="text"
          placeholder="Enter name..."
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
        
      
        <input
          type="email"
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        
        
        <input
          type="password"
          placeholder="Enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        
        
        <input
          type="password"
          placeholder="Confirm password..."
          value={data.confirmpassword}
          onChange={(e) => setData({ ...data, confirmpassword: e.target.value })}
        />
        {errors.confirmpassword && <p className="error-message">{errors.confirmpassword}</p>}
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
