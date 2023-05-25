import React from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {
  const onSubmitHandler = (values) => {
    console.log(values);
  };


  let navigate = useNavigate();
  const navtoLogin = () => {
    navigate("/login");
}
  return (
    <>
      <div className='container my-3 mt-4'>
        <h2 className='my-3 '>Create an Account to Continue</h2>
        <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" required />

          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" required autoComplete="off"/>

          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name='password' required minLength={5} autoComplete="off"/>
        </div>
        <button type="submit" className="btn btn-primary"  >Create Account</button>
      </form>
      <h6 className='my-4'>Already have an Account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoLogin}>Login Here. </span></h6> 
    </div>
    </>
  );
};

export default Register;
