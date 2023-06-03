import React from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, message } from "antd";
import axios from "axios";
import {useDispatch} from "react-redux";
import {showLoading, hideLoading} from "../redux/features/alertslice";

const Login = () => { 
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const navtoSign = () => {
    navigate("/register");
  };

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      dispatch(hideLoading());
      // const isBlocked = res.data.data.isBlocked;
      // if (isBlocked) {
      //   message.error(" Your account is blocked. Please contact the administrator.");
      // }
       if (res.data.success) {  
        console.log(res.data)  
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
        } else {
          message.error(res.data.message);
        }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };

  return (
    <>
      <div className="container my-3 mt-4">
        <h2>Login to continue</h2>
        <Form layout="vertical" onFinish={onfinishHandler}>

          <div className="mb-3 my-3">
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
          </div>

          <div className="mb-3">
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
          </div>

          <button type="submit" className="btn btn-primary">
            Let me in.
          </button>

        </Form>
        <h6 className="my-4">
          Not have an account?
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={navtoSign}>
            Create Here.
          </span>
        </h6>
      </div>
    </>
  );
};

export default Login;
