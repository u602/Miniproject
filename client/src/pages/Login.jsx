
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import '../pages/css/login.css';
import Navbar from '../components/Navbar';

export default function Login() {
  const token=localStorage.getItem('token')
  useEffect(() => {
    if(token){
      navigate('/')
    }
    else{
      navigate('/login')
    }
  },[])
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = { email: '', password: '' };
    let isValid = true;

    
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
    }

    setErrors(newErrors);
    return isValid;
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });

    if (!validateForm()) return;

    const { email, password } = data;
    try {
      const response = await axios.post('/login', { email, password });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({ email: '', password: '' }); 
        console.log(response);
        localStorage.setItem('token',response.data.token)
        navigate('/');
      }
    } catch (error) {
      toast.error('Login failed, please try again');
    }
  };

  return (
    <div>
         <Navbar/>
      <form onSubmit={loginUser}>
        
        <input
          type='email'
          placeholder="Enter email..."
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        {errors.email && <p className="error-message">{errors.email}</p>}
        
        
        <input
          type='password'
          placeholder="Enter password..."
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        {errors.password && <p className="error-message">{errors.password}</p>}
        
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}
