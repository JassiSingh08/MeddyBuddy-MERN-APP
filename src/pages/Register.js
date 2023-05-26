import React from "react";
import { Form, Input, message } from "antd";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertslice";

const Register = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async(values) => {
   try {
        dispatch(showLoading());
        const res = await axios.post("/api/v1/user/register", values);
        dispatch(hideLoading());
        if(res.data.success){
          console.log(res.data);
          message.success("Account created successfully");
          navigate('/login')
        }else{
          message.error("Something went wrong");
        }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong "  +error);
    }
  }
    

  const navtoLogin = () => {
    navigate("/login");
}
  return (
    <>
      <div className='container my-3 mt-4'>
        <h2 className='my-3 '>Create an Account to Continue</h2>
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="register-form"
        >
        <div className="mb-3">
        <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
        </div>
        <button type="submit" className="btn btn-primary"  >Create Account</button>
      </Form>
      <h6 className='my-4'>Already have an Account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoLogin}>Login Here. </span></h6> 
    </div>
    </>
  );
};

export default Register;
