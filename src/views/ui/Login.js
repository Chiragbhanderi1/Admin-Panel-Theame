import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const Navigate =useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(()=>{
    if(localStorage.getItem('myuser')){
      Navigate("/")
    }
     // eslint-disable-next-line
  },[])
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(email==="technoithub" && password==="admin@technoithub"){
      localStorage.setItem('myuser',"admin")
      Navigate("/")
    }
    else{
      console.log(email,password)
      alert("Wrong Credentials")
    }
  }
  return (
    <div className='bg-white'>
      <section className="vh-100 d-flex justify-content-center align-items-center">
  <div className="container-fluid h-custom ">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
        <form className='border p-5' onSubmit={handleSubmit}>
          <div className="form-outline mb-4">
            <label className="form-label" for="form3Example3">User Name</label>
            <input type="text" id="form3Example3" className="form-control form-control-lg" required  value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter a valid User Name" />
          </div>

          <div className="form-outline mb-3">
            <label className="form-label" for="form3Example4">Password</label>
            <input type="password" id="form3Example4" className="form-control form-control-lg" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg" style={{paddingLeft: "2.5rem", paddingRight: "2.5rem", width:"100%"}}>Login</button>
        </form>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}

export default Login
