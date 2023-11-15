import {
  Card,
  Col,
  Divider,
  Row,
  Input,
  Button,
  Table,
  Form,
  Space,
  message,
} from "antd";

import BackButton from "../../components/BackButton";
import CategoryList from "./categoryList";
import categoryService from "../../services/category.service";
import { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
const ProductCategories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [form] = Form.useForm();
  const onSubmitCreateNewProductDirectory = () => {
    const values = form.validateFields();
    values.then((va) => {
      categoryService.createCategories(va.categoryName).then(
        (response) => {
          console.log(response);
          message.success("create new category successfully");
          form.resetFields();
          setCallback(!callback);
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
    });
  };
  return (
    <Card style={{ border: "none" }}>
      <Row>
        <BackButton />
      </Row>
      <Row>
        <Col flex={2}>
          <Card style={{ border: "none" }}>
            <Form form={form} onFinish={onSubmitCreateNewProductDirectory}>
              <Space.Compact size="large" block>
                <Form.Item
                  style={{
                    width: "70%",
                  }}
                  name="categoryName"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{
                    width: "30%",
                    paddingLeft: "10px",
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    CREATE
                  </Button>
                </Form.Item>
              </Space.Compact>
            </Form>
          </Card>
        </Col>
        <Col flex={3}>
          <CategoryList />
        </Col>
      </Row>
    </Card>
  );
};

export default ProductCategories;
