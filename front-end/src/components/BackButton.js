import React from "react";
import { LeftOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
const BackButton = ({ url }) => {
  // const navigate = useNavigate();
  return (<Button style={{ backgroundColor: '#0ecf26' }} shape="circle" type="primary" icon={<ArrowLeftOutlined style={{ lineHeight: "0px" }} onClick={() => {
    window.history.go(-1);
    return false;
  }} />}></Button>);
};

export default BackButton;
