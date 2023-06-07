import { Form, Input, message } from 'antd';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [formTitle, setFormTitle] = useState("Please enter your Register Email ID to receive OTP");
  const navigate = useNavigate();
  const handleSendEmail = async (values) => {
    try {
      const response = await axios.post('/api/v1/user/forgot-password', values);
      message.success(response.data.message);
      setShowOtpInput(true);
      setFormTitle("Please enter the OTP and new password");
    } catch (error) {
      message.error(error.response.data.error);
    }
  };

  const handleUpdatePassword = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/v1/user/update-password', {
        otp: values.otp,
        newPassword: values.newPassword,
      });
      setLoading(false);
      message.success(response.data.message);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error(error.response.data.error);
    }
  };

  return (
    <div>
      <section className="vh-100 " style={{ backgroundColor: "#1677ffec" }}>
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              {/* <div className="card text-black" style={{ borderRadius: "25px" }}> */}
                <div className=" card card-body p-md-5 text-black " style={{ borderRadius: "25px" }}>
                  <div className="row justify-content-center">
                    <div className="col-md-12 col-lg-8 col-xl-7 order-2 order-lg-1">
                      <p className="text-center h4 fw-normal mb-5 mx-1 mx-md-4 mt-4">
                      {formTitle}
                      </p>

                      {showOtpInput ? (
                        <>
                          <Form onFinish={handleUpdatePassword}>
                            <Form.Item
                              name="otp"
                              label="OTP"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter the OTP",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item
                              name="newPassword"
                              label="New Password"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter a new password",
                                },
                                // Add any additional password validation rules here
                              ]}
                            >
                              <Input.Password />
                            </Form.Item>
                            <Form.Item>
                            <div class="d-flex justify-content-center">
                                <button
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}
                                  class="btn btn-primary"
                                >
                                  Update Password
                                </button>
                              </div>
                            </Form.Item>
                          </Form>
                        </>
                      ) : (
                        <>
                          <Form onFinish={handleSendEmail}>
                            <Form.Item
                              name="email"
                              label="Email"
                              rules={[
                                {
                                  required: true,
                                  message: "Please enter your email",
                                },
                                {
                                  type: "email",
                                  message: "Please enter a valid email",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                            <Form.Item>
                              <div class="d-flex justify-content-center">
                                <button
                                  type="primary"
                                  htmlType="submit"
                                  loading={loading}
                                  class="btn btn-primary"
                                >
                                  Send OTP
                                </button>
                              </div>
                            </Form.Item>
                          </Form>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            {/* </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPasswordForm;
