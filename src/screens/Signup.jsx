import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  const [credentials, setCredentials] = useState({name:"", email:"", password:"", address:""});

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

    if(!json.success){
      alert("Enter valid credentials!")
    }

  }

  const onChange=(event)=>{
    setCredentials({...credentials, [event.target.name]:event.target.value})
  }

  return (<>
    <div className="container">
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="m-3 btn btn-primary">Signup</button>
        <Link to="/login" className='m-3 btn btn-danger'>Already a user</Link>
      </form>
    </div>
  </>)
}
