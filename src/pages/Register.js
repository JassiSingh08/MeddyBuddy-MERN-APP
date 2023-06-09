import React from "react";
import { Form, Input, message } from "antd";
import {useNavigate} from "react-router-dom";
import axios from 'axios';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertslice";
import SignUpPageImage from "../Assets/SignUpPageImage.jpg"


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
    
  const validatePassword = (_, value) => {
    // Password validation regex pattern
    const passwordPattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{8,}$/;

    if (!value || passwordPattern.test(value)) {
      return Promise.resolve();
    }

    return Promise.reject(
      ''
    );
  };

/*   const handlePasswordFocus = () => {
    setPasswordFocused(true);
  };

  const handlePasswordBlur = () => {
    setPasswordFocused(false);
  };
 */
  const navtoLogin = () => {
    navigate("/login");
}
  return (
    // <>
    //   <div className='container my-3 mt-4'>
    //     <h2 className='my-3 '>Create an Account to Continue</h2>
    //     <Form
    //       layout="vertical"
    //       onFinish={onfinishHandler}
    //       className="register-form"
    //     >
    //     <div className="mb-3">
    //     <Form.Item label="Name" name="name">
    //         <Input type="text" required />
    //       </Form.Item>
    //       <Form.Item label="Email" name="email">
    //         <Input type="email" required />
    //       </Form.Item>
    //       <Form.Item label="Password" name="password">
    //         <Input type="password" required />
    //       </Form.Item>
    //     </div>
    //     <button type="submit" className="btn btn-primary"  >Create Account</button>
    //   </Form>
    // <h6 className='my-4'>Already have an Account? <span style={{cursor: 'pointer', textDecoration:"underline"}} onClick={navtoLogin}>Login Here. </span></h6>
    // </div>
    // </>
    <>
      <section className="vh-100" style={{ backgroundColor: "#1677ffec" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: "25px" }}>
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-3 mx-1 mx-md-4 mt-2">
                        Sign up
                      </p>
                      <div>
                          <p style={{fontSize:"smaller"}}>*Please Use correct Credentials as it will help you in case you forgot your password! </p>
                        </div>

                      <Form
                        layout="vertical"
                        onFinish={onfinishHandler}
                        className="mx-1 mx-md-4 register-form"
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item label="Your Name:" name="name">
                              <Input
                                type="text"
                                placeholder="Enter your name"
                                autoComplete="off"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item label="Your Email:" name="email">
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="off"
                              />
                            </Form.Item>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <Form.Item
                              name="password"
                              label="Please create a Password"
                              rules={[
                                { required: true },
                                { validator: validatePassword },
                              ]}
                              hasFeedback
                              // hasFeedback={passwordFocused}
                            >
                              <Input.Password
                              // onFocus={handlePasswordFocus}
                              // onBlur={handlePasswordBlur}
                              />
                            </Form.Item>
                          </div>
                        </div>
                        <div>
                          <p className="small mt-1 pt-1 mb-3">*Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.</p>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-2 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary btn-lg"
                          >
                            Register
                          </button>
                        </div>
                        <div className="text-center text-lg-start mt-4 pt-2">
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            Already have an Account?{" "}
                            <span
                              style={{
                                cursor: "pointer",
                                textDecoration: "underline",
                              }}
                              onClick={navtoLogin}
                            >
                              Login Here.{" "}
                            </span>
                          </p>
                        </div>
                      </Form>
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-6 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src={SignUpPageImage}
                        width={600}
                        height={500}
                        className="img-fluid"
                        alt="Registration"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}


export default Register;


