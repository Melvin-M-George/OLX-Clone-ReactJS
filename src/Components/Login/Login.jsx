import React, { useState,useContext } from 'react';
import {FirebaseContext} from '../../store/Context'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Logo from "/src/olx-logo.png";
import './Login.css';
import {toast} from 'react-toastify'

function Login() {
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const[errors,setErrors] = useState({})
  const navigate = useNavigate()

  const {auth} = useContext(FirebaseContext)

  function validateForm(){
    let isValid = true;
    const newErrors = {};

    if(!email.trim()){
      newErrors.email = "Email is Reqired"
      isValid = false
    }else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    if(!password.trim()){
      newErrors.password = "Password is Required"
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    setErrors(newErrors)
    return isValid
  }
  async function handleLogin(e){
    e.preventDefault()
    if(!validateForm()) return;
    if(email.trim()===''){
      return
    }
    if(password.trim()===''){
      return
    }
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("Login Successfully")
      navigate('/')
    } catch (error) {
      toast.error(error.code.split('/')[1].split('-').join(' '))
      console.log(error)
    }
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Login</button>
        </form>
        <a style={{cursor:'pointer'}} onClick={()=>navigate('/signup')}>Signup</a>
      </div>
    </div>
  );
}

export default Login;