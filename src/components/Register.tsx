import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Register()
{
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,serConfirnPassword] = useState('');
    const navigate = useNavigate();
    const axios = require('axios').default;
    const onSubmit = async()=>{
        let parm ={
          username:username,
          password:password
        }
        if (
            username.length === 0 ||
            password.length === 0 ||
            confirmPassword.length === 0
          ) {
            Swal.fire({
              title: "Username, password and confirm password should not be empty!",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }
          else if (
            password !== confirmPassword
          ) {
            Swal.fire({
              title: "Password Not Matched!",
              showClass: {
                popup: "animate__animated animate__fadeInDown",
              },
              hideClass: {
                popup: "animate__animated animate__fadeOutUp",
              },
            });
          }
          else{
        const result:any = await axios.post("https://api-ashish-dotnet.azurewebsites.net/auth/register",parm).catch(
          function (error : any) {
            alert("Invalid username or password!");
            return Promise.reject(error)
          });
        if(result.data.success){
          navigate('/auth');
        }
        console.log(result.data)
    }
    } 
     return(
        <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register User</h3>
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
          <div className="form-group mt-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="confirm password"
              onChange={e => serConfirnPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={onSubmit}>
              Register
            </button>
            <p>Not a member? <button onClick={() => navigate('/auth')}>Sign In</button></p>
          </div>
        </div>
      </form>
    </div>
     )
}
export default Register;