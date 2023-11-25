import React, { useState, useContext } from "react";
import { PlusOutlined } from "@ant-design/icons";
import "./commentStyle.css";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Rate,
  Space,
  message,
} from "antd";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import productService from "../../services/product.service";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CommentCreateForm = ({ id, callbackComment, setCallbackComment }) => {
  const [form] = Form.useForm();
  const state = useContext(GlobalState);
  const [content, setContent] = useState("");
  const [userInfo] = state.userAPI.userInfo;
  const socket = state.socket;
  const [star, setStar] = useState(0);
  console.log(userInfo);
  const onChangeInput = (e) => {
    setContent(e.target.value);
  };

  const commentSubmit = async () => {
    const createdAt = new Date().toISOString();
    socket.emit("createComment", {
      name: userInfo.name,
      content,
      product_id: id,
      createdAt,
      star,
    });

    if (star && star !== 0) {
      productService.patchReviewsProduct(id, star).then(
        (response) => {
          console.log(response);
          message.success("comment successfully");
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
    }

    setContent("");
    setCallbackComment(!callbackComment);
  };
  return (
    <Form form={form} onFinish={commentSubmit} className="form-create-comment">
      <Rate
        style={{ position: "absolute", zIndex: "1" }}
        onChange={(e) => {
          setStar(e);
        }}
      />
      <Space.Compact block>
        <Form.Item style={{ width: "100%" }}>
          <TextArea
            placeholder="Enter content..."
            rows={5}
            style={{ paddingTop: "40px" }}
            className="textArea"
            onChange={(e) => onChangeInput(e)}
          ></TextArea>
        </Form.Item>
        <Form.Item
          style={{ display: "flex", alignItems: "center", paddingLeft: "20px" }}
        >
          <Button type="primary" htmlType="submit">
            SEND
          </Button>
        </Form.Item>
      </Space.Compact>
    </Form>
  );
};
export default CommentCreateForm;
