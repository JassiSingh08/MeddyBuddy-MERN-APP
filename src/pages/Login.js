import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate()
  const navtoSign = () => {
    navigate("/register");
}

  const handleSubmit = () => {
    console.log("hello")
  } 
  return (
   <>
    <div className='container my-3 mt-4'>
            <h2>Login to continue</h2>
            <form onSubmit={handleSubmit} >
                <div className="mb-3 my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' autoComplete="off" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" autoComplete="off" name='password' />
                </div>

                <button type="submit" className="btn btn-primary" >Let me in.</button>
            </form>
            <h6 className='my-4'>Not have an account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoSign}>Create Here. </span></h6> 
        </div>
   </>
  )
}

export default Login