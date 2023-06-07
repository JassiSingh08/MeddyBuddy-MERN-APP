import React, {useEffect,  useState} from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import { Input, Row } from 'antd';
import DoctorList from '../components/DoctorList';


const HomePage = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([]);




  //login user data
  const getuserdata = async() => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors",{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if(res.data.success){
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getuserdata()
  }, []);
  
  const handleSearch = (value) => {
    const filtered = doctors.filter((doctor) => {
      const specialization = doctor.specialization ? doctor.specialization.toLowerCase() : '';
      const experience = doctor.experience ? doctor.experience.toString() : '';
      const name = doctor.firstName ? doctor.firstName.toLowerCase() : '';
      const Lname = doctor.lastName ? doctor.lastName.toLowerCase() : '';
      const consultationFees = doctor.consultationFees ? doctor.consultationFees.toString() : '';
  
      return (
        specialization.includes(value.toLowerCase()) ||
        experience.includes(value) ||
        name.includes(value.toLowerCase()) ||
        Lname.includes(value.toLowerCase()) ||
        consultationFees.includes(value)
      );
    });
  
    setFilteredDoctors(filtered);
  };
  
  return (
    <Layout>
      <h1 className="text-center">HomePage</h1>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 16,
          marginRight: 10,
        }}
      >
        <Input.Search
          placeholder="Enter Name or Specialization"
          onChange={(e) => handleSearch(e.target.value)}
          allowClear
          enterButton
          style={{ width: 300 }}
        />
      </div>
      <Row>
          {(filteredDoctors.length > 0 ? filteredDoctors : doctors).map(
            (doctor, i) => (
              <DoctorList key={i} doctor={doctor} />
            )
          )}
      </Row>
    </Layout>
  );
}

export default HomePage