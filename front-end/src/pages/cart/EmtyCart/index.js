import React from "react";
import { ShoppingOutlined } from "@ant-design/icons";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const EmptyCartPage = () => {
  const navigate = useNavigate();
  return (
    <Result
      icon={<ShoppingOutlined />}
      title="YOUR CART IS EMPTY"
      extra={
        <Button
          onClick={() => {
            navigate("/");
          }}
          type="primary"
        >
          Shopping now
        </Button>
      }
    />
  );
};

export default EmptyCartPage;
