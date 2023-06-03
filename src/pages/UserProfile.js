import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Form, Input, Row, message } from "antd";
import { hideLoading, showLoading } from '../redux/features/alertslice'
import TextArea from 'antd/es/input/TextArea'


const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  const [User, setUser] = useState(null);
  const params = useParams();
  // const navigate = useNavigate()
  const dispatch = useDispatch();

  //get Doc details
  const getUserInfo = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserInfo",
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        setUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //update Form
    const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post('/api/v1/user/update-user-profile', {...values, userId: user._id},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.message);
        // navigate('/')
      }else{
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error)
      message.error("Something Went Wrong")
    } 
  };

  useEffect(() => {
    getUserInfo();
    //eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <h1>Manage Profile</h1>
      {User && (
        <Form
          className="m-4"
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            name: User.name,
            email: User.email,
          }}
        >
          {/* initial value in build in atnd helping in auto populate form */}
          <h4 className="mb-4">Personal Details : </h4>
          <Row className="mx-5 my-2">
            <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Please Enter Your Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row className="mx-5 my-2">
{/*             <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No."
                name="phone"
                required
                rules={[{ required: true }]}
              >
                <Input type="tel" placeholder="Please Enter Your Name" />
              </Form.Item>
            </Col> */}
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
            <Col className="mx-5 my-2" xs={24} md={24} lg={8}>
              <Form.Item
                label="Password"
                name="password"
                required
                rules={[{ required: true }]}
              >
                <Input type="password" placeholder="Please Enter Updated Password" />
              </Form.Item>
            </Col>
          </Row>

          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" type="submit">
              Update
            </button>
          </div>
        </Form>
      )}
    </Layout>
  );
}

export default UserProfile