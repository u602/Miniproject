
import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>

      <Link to='/register' style={{ marginRight: '20px' }}>Register</Link>
      <Link to='/login'>Login</Link>
    </nav>
  );
}

