import React from "react";
import { Button, Col, Form, Input, Row, TimePicker, message } from "antd";
// import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showLoading,hideLoading} from "../redux/features/alertslice"
import axios from "axios";
import Layout from "../components/Layout";

const ApplyDoctor = () => {

  const {user} = useSelector(state => state.user);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const convertToBase64 = (e) =>{
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
    }
    reader.onerror = (error) => {
      console.log(error);
    }

  }

  //HANDLE FORM
 const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/apply-doctor', {...values, userId: user._id},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        navigate('/')
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      message.error("Something Went Wrong")
    }
  }; 

  return (
    <Layout>
      <h3 className="text-center">Apply for a Doctor's Account</h3>
      <div className="d-flex justify-content-center align-items-center">
        <div
          style={{
            overflow: "auto",
            maxHeight: "570px",
            width: "100%",
            overflowX: "hidden",
          }}
        >
          <Form
            className="my-2 mx-4"
            layout="vertical"
            style={{ width: "100%" }}
            onFinish={handleFinish}
          >
            <h4>Personal Details:</h4>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  required
                  rules={[
                    { required: true, message: "Please enter your first name" },
                  ]}
                >
                  <Input placeholder="Please Enter Your First Name" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  required
                  rules={[
                    { required: true, message: "Please enter your last name" },
                  ]}
                >
                  <Input placeholder="Please Enter Your Last Name" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Phone No."
                  name="phone"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input type="tel" placeholder="Please Enter Your Phone No." />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  required
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input type="email" placeholder="Please Enter Your Email" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item label="Website (if any)" name="website">
                  <Input type="text" placeholder="Please Enter Your Website" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Address"
                  name="address"
                  required
                  rules={[
                    { required: true, message: "Please enter your address" },
                  ]}
                >
                  <Input.TextArea
                    rows={1}
                    placeholder="Please Enter Your Address"
                  />
                </Form.Item>
              </Col>
            </Row>

            <h4 className="mb-2">Professional Details:</h4>

            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter your specialization",
                    },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Please Enter Specialization"
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Experience"
                  name="experience"
                  required
                  rules={[
                    { required: true, message: "Please enter your experience" },
                  ]}
                >
                  <Input
                    type="text"
                    placeholder="Please Enter Your Experience"
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Consultation Fee"
                  name="ConsultationFee"
                  required
                  rules={[
                    {
                      required: true,
                      message: "Please enter your consultation fee",
                    },
                  ]}
                >
                  <Input type="text" placeholder="Please Enter Your Fee" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Timings"
                  name="timings"
                  required
                  rules={[
                    { required: true, message: "Please select your timings" },
                  ]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>
            <Row>
            </Row>
              <Col xs={24} sm={12} lg={12}>
                <Form.Item
                  label="Please upload your Prescription Paper(if any)"
                  name="prescription"
                >
                  <Input
                    onChange={convertToBase64}
                    accept="image/*"
                    type="file"
                    placeholder="Please upload your Prescription Paper(if any)"
                  />
                </Form.Item>
              </Col>
            <div className="d-flex justify-content-center ">
              <Button
                type="primary"
                htmlType="submit"
                style={{ fontSize: "1rem", padding: "4px 15px" }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
