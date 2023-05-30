import React from "react";
import { Tabs, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from  "../redux/features/alertslice";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Notification = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //handle Read Notification
  const handleMarkRead = async () => {
    try {
        dispatch(showLoading())
        const res = await axios.post("/api/v1/user/get-all-notification", {userId: user._id},{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error("Something went wrong")
    }
  };
  const handleDeleteAllRead = async () => {
    try {
        dispatch(showLoading());
        const res = await axios.post('/api/v1/user/delete-all-notification', {userId: user._id},{
            headers:{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        dispatch(hideLoading())
        if(res.data.success){
            message.success(res.data.message)
        }else{
            message.error(res.data.message)
        }
    } catch (error) {
        dispatch(hideLoading());
        console.log(error)
        message.error("Something went wrong")
    }
  };

  return (
    <>
      <h2 className="m-3 text-center">Notification</h2>
      <Tabs className="mx-4">
        <Tabs.TabPane tab="UnRead" key={0}>
          <div className="d-flex justify-content-end mx-3 text-primary" style={{cursor:'pointer'}}>
            <h6 onClick={handleMarkRead}>Mark All Read</h6>
          </div>
          <div style={{cursor:'pointer'}}>
            {user?.notification.map((notificationMsg) => (
              <div className="card p-3" onClick={()=>{navigate(notificationMsg.onClickPath)}}>
                <div className="card-text"> {notificationMsg.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end mx-3 text-primary" style={{cursor:'pointer'}}>
            <h6 onClick={handleDeleteAllRead}>Delete All Read</h6>
          </div>
          <div style={{cursor:'pointer'}}>
            {user?.seenNotification.map((notificationMsg) => (
              <div className="card p-3" onClick={()=>{navigate(notificationMsg.onClickPath)}}>
                <div className="card-text"> {notificationMsg.message}</div>
              </div>
            ))}
          </div>
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default Notification;
