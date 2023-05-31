import React from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {showLoading,hideLoading} from "../redux/features/alertslice"
import axios from "axios";
import Layout from "../components/Layout";

const ApplyDoctor = () => {

  const {user} = useSelector(state => state.user);  
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <h1 className="text-center">Apply Doctor</h1>
      <Form className="m-4" layout="horizontal" onFinish={handleFinish}>
        <h4 className="mb-4">Personal Details : </h4>
        <Row className="mx-5 my-2">
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Please Enter Your Name" />
            </Form.Item>
          </Col>
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Please Enter Your Last Name" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="mx-5 my-2">
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No."
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="tel" placeholder="Please Enter Your Name" />
            </Form.Item>
          </Col>
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="Please Enter Your Email" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="mx-5 my-2">
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item label="Website(if any)" name="website">
              <Input type="text" placeholder="Please Enter Your website" />
            </Form.Item>
          </Col>
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Address"
              name="address"
              required
              rules={[{ required: true }]}
            >
              <TextArea rows={1} placeholder="Please Enter Your Address" />
            </Form.Item>
          </Col>
        </Row>

        <h4 className="mb-4">Professional Details : </h4>

        <Row className="mx-5 my-2">
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Please Enter Specialization" />
            </Form.Item>
          </Col>
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Please Enter Your Experience" />
            </Form.Item>
          </Col>
        </Row>
        <Row className="mx-5 my-2">
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="ConsultationFee"
              name="ConsultationFee"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Please Enter yourFee" />
            </Form.Item>
          </Col>
          <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
            <Form.Item
              label="Timings"
              name="timings"
              required
              rules={[{ required: true }]}
            >
                <TimePicker.RangePicker format="HH:mm"/>
            </Form.Item>
          </Col>
        </Row>
        <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
                Submit
            </button>
        </div>
      </Form>
    </Layout>
  );
};

export default ApplyDoctor;