
import './App.css'
import {Routes, Route} from 'react-router-dom'
import Home from '../src/pages/Home'
import Login from './pages/Login';
import Register from './pages/Register'
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContextProvider } from  '../context/userContext';



axios.defaults.baseURL='http://localhost:8080'
axios.defaults.withCredentials=true






function App() {

  return (
   <UserContextProvider>
 
    <Toaster position='top-center' toastOptions={{duration:2000}}/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      

    </Routes>
  
      
    </UserContextProvider> 
  )
}

export default App
