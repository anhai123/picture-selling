import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
const Notfound = () => {
  const Navigate = useNavigate();
  const ClickButton = () => {
    Navigate("/");
  };
  <Result
    status="404"
    title="404"
    subTitle="Sản phẩm bạn tìm không tồn tại"
    extra={
      <Button onClick={() => ClickButton()} type="primary">
        Back Home
      </Button>
    }
  />;
};
export default Notfound;
