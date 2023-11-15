import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Card,
  Space,
  message,
} from "antd";
import authService from "../../services/auth.service";
const Login = () => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    authService.login(values.username, values.password).then(
      (response) => {
        console.log(response);
        message.success("login successfully");
        window.location.href = "/";
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  };
  return (
    <Row
      type="flex"
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundColor: "rgba(255,255,255,$bg-white)",
        borderRadius: "0.75rem",
        backgroundColor: "white",
        boxShadow:
          " 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
      }}
    >
      <Card
        title={
          <span
            style={{
              display: "flex",

              justifyContent: " space-around",
            }}
          >
            LOGIN
          </span>
        }
        style={{
          backgroundColor: "rgba(255,255,255,$bg-white)",
          borderRadius: "0.75rem",
          backgroundColor: "white",
          boxShadow:
            " 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -2px rgb(0 0 0 / 5%)",
        }}
      >
        <Col>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your Username!",
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              <span
                style={{
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  right: "0px",
                }}
              >
                {" "}
                Or <a href="register">register now!</a>
              </span>
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </Row>
  );
};
export default Login;
