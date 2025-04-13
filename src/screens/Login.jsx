import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Login() {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials!");
    }else{
      console.log("Logined");
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.setItem("authToken", json.authToken));
      navigate("/")
    }

  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div className="d-flex flex-column mt-[85px]">
      <Navbar />
  
      <div className="container my-5 d-flex justify-content-center">
        <form onSubmit={handleSubmit} className="w-50">
          <div className="m-3 form-group">
            <label className='ms-3 m-2' htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credentials.email} onChange={onChange} />
          </div>
          <div className="m-3 form-group">
            <label className='ms-3 m-2' htmlFor="exampleInputPassword1">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credentials.password} onChange={onChange} />
          </div>
          <div className="m-3 d-flex justify-content-center gap-3">
            <Link to="/signup" className='m-3 btn btn-danger fw-bold text-white w-25'>Not a user</Link>
            <button type="submit" className="m-3 btn btn-success fw-bold text-white w-25">Login</button>
          </div>
        </form>
      </div>
  
      <div className="fixed-bottom">
        <Footer />
      </div>
    </div>
  );  
}
