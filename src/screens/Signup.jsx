import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Signup() {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", address:""});
  const navigate = useNavigate();

  const handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, address:credentials.address})
    });
    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      if (json.errors && json.errors.length > 0) {
        alert(json.errors[0].msg); // Show alert with the backend error message
      } else {
        alert("Something went wrong!");
      }
    }else{
      console.log("Signuped");
      console.log(localStorage.setItem("authToken", json.authToken));
      navigate("/")
    }

  }

  const onChange=(event)=>{
    setCredentials({...credentials, [event.target.name]:event.target.value})
  }

  return (<div className='d-flex flex-column min-vh-100'>
    <Navbar></Navbar>
    <div className="container my-5 d-flex justify-content-center">
      <form onSubmit={handleSubmit} className="w-50">
        <div className="m-3 form-group">
          <label htmlFor="name">Name</label>
          <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
        </div>
        <div className="m-3 form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange}/>
        </div>
        <div className="m-3 form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange}/>
        </div>
        <div className="m-3 form-group">
          <label htmlFor="address">Address</label>
          <input type="text" className="form-control" name='address' value={credentials.address} onChange={onChange}/>
        </div>   

        <div className='d-flex justify-content-center gap-3'>
          <button type="submit" className="m-3 btn btn-success fw-bold text-white">Signup</button>
          <Link to="/login" className='m-3 btn btn-danger fw-bold text-white'>Already a user</Link>
        </div>     
      </form>
    </div>
    <Footer className="mt-auto"></Footer>
  </div>)
}
