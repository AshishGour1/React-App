
import React, { useState } from "react";
import PropTypes, { string } from 'prop-types';
import {useNavigate} from 'react-router-dom';
import axios from "axios";

 function Auth(setToken : any) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const axios = require('axios').default;
  const onSubmit = async()=>{
    let parm ={
      username:username,
      password:password
    }
    const result:any = await axios.post("https://api-ashish-dotnet.azurewebsites.net/auth/login",parm).catch(
      function (error : any) {
        alert("Invalid username or password!");
        return Promise.reject(error)
      });
    if(result.data.success){
      setToken.setToken(result.data.token);
      localStorage.setItem('token',result.data.token)
      navigate('/role');
    }
    console.log(result.data)
   } 
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="Enter Username"
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Sign In
            </button>
            <p>Not a member? <button onClick={() => navigate('/register')}>Register</button></p>
          </div>
        </div>
      </form>
    </div>
  )
}
export default Auth;
