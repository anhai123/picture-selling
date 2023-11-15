import React from "react";
import { LeftOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const BackButton = ({ url }) => {
  // const navigate = useNavigate();
  return <ArrowLeftOutlined style={{ lineHeight: "0px" }} />;
};

export default BackButton;
