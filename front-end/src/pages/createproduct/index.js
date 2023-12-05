import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Result,
  Select,
  Upload,
} from "antd";
import React, { useContext, useEffect } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { resizeFile } from "..";
import BackButton from "../../components/BackButton";
import { Card, Col, Row, Image } from "antd";
import "./createproduct.css";
import productService from "../../services/product.service";
import authService from "../../services/auth.service";
import { GlobalState } from "../../GlobalState";
import { useNavigate, useParams } from "react-router-dom";
const key = "updatable";
const { Option } = Select;
var reader = new FileReader();
const initImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAMFBMVEX6+vrR2eH///+vvczw8vTX3uXN1d60wc/n6+/19vfDzdjr7vHc4ui+ydW5xdLh5uuLqaxwAAAE2klEQVR4nO2c6ZqrIAyGcQARcbn/uz0J4NKpQltodM6T70ddgdcQAgozQvw9/VwN8IkYmkoMTSWGphJDU4mhqcTQVGJoKjE0lRiaSgxNJYamEkNTiaGpxNBUYmgqMTSVGHqVnXWD0rP9RvbfgHYROWC7+gVUh7Zqbh41q9rmrgxtfxNH7rrYNaFtNxwio4auInc1aKsSyAG7mpvUglZp4sit6hRWBfqp7Z1rrsFdDm3doPOwq/Tgir2kFNp27xBH7tJGWQbt3ieO3EVdTgH0J0auY+4S6BJmoL4EWrgi6AIHKfLpXH9yLuhpCsotjR5vhOhNpcG6QufyUme4M3J591IArXW0mN0PoNOC4XVof2rW+groUNE2cr+CrSNxHHNfBQ0gS23bLoO8BmYVH/A66GZrVzAKOSVeRxy7lnspNGBvSEduorfH2gebi6F3XrJWfv7S5dDoAdHa8A6zextf31fsk+/cAXqLZ2tXuXZ8h1HxFtBIub4H2q5bw4U97n/uAt0cfC44+axwK2h4odoNlW13/jJ2J+hmNyJKjqduBg3dn78l3UneDrpBW6v0LfeDRlNnRiMMzdAMzdAMzdAMzdAMzdAMzdAM/d9Apz+j56EvmQlIf0XPQl8z+YnfGc+tnYbWl07JnWKnoHVXVmiFpRPHaOfQ5QuDaixSOZy4PYEum6qNqrQc6NlLDqFL/SKq3sKrIQs93G3hFVA/zsj9hh6crbbIrepiwv2ylUfo4hVAD6q9bHP1kj10Nb+Iqr/WNJp7hQYj33ytqRfOs/gZT6V11eWai760flqFaKyqL+j14pXqVGJoKjE0lRiaSgxNJYamEkNTiaGpxNBUYmgqMTSVGJpKDE0lhqYSQwdJWenPw0+VhJZSh81bWaahe1k+w5WB9uXXgG7G+KXayOGt3I6Ugx5FHej1pK3w/z4y0AYdBKFta6RporWkgaMJrrSyNZMQroenm+FCN0rZI59n9D96wmtSxlqDJNonk2bWkMkcUk9+imaSpscCQ2EfQ+tAgK6IoP1yXva99KXDnnDGH87CAV8rH6AxXTsqONu2doOWYx8zUWKOW0jdj74Z9XJsJnlOnYEWIzgIbGZprFAyNiKfs5YTlA6noYw2HPqdeQ/dSaNikugeARq8bkQTTOjhPoshpJ7g8oyXXcIpc9DOWxsrVGDWeiOw8Nt6cxjp/KH1O2IP3fh0z9Ba7H6G3qAZfOpYEZs7fQINFjQeuokF/oLW+8Ml2GzQ7VLJCegGPGiErb8lXO416nRmLAsN1QibAWsMLLm4x4xuYOJTjN5ccIh1i3WjBN6Jz4BOk4OWYGHcelfBvHxhKeWhHUIDbz+MS2YQVbQ2S+noxY0/hFppMFpg+5v8DqQbB92iC7X6BBouNdKzGt3iji9saM/jeR5aoE8LN2FrX0Ieugx6a/QXjR6Ie1C4nAxAK7jdTBgSMJ20QBQb1jM0xkODbtTKGGNDog+jR9ftNm5bEwMmDEcqnrPLH0yqzsGN/vZ1p/N/D7rcilu/v/9xdsluRM/DRKnp6Y8GTN8ZEqmxGUIMzelG0A59bnqll/8IuquzFOlJ4Ekv3ccvAVRiaCoxNJUYmkoMTSWGphJDU4mhqcTQVGJoKjE0lRiaSgxNJYamEkNTiaGpxNBU+hE/f1D/AB15LBIOLRuUAAAAAElFTkSuQmCC";
const CreateProduct = () => {
  const [form] = Form.useForm();
  const state1 = useContext(GlobalState);
  const [categories] = state1.categoriesAPI.categories;
  const [callback, setCallback] = state1.productsAPI.callback;
  const [productCategory, setProductCategory] = useState({});
  const [onEdit, setOnEdit] = useState(false);
  const [product, setProduct] = useState({});
  const [products] = state1.productsAPI.products;
  const [isAdmin] = state1.userAPI.isAdmin;
  console.log(product);
  const navigate = useNavigate();
  const params = useParams();
  const [state, setState] = useState({
    selectedFile: null,
    selectedFileList: [],
  });

  const [srcUploadImage, setSrcUploadImage] = useState(initImage);
  const dummyRequest = ({ file, onSuccess }) => {
    console.log(file);
    const url = URL.createObjectURL(file);
    setSrcUploadImage(url);
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const onChange = (value) => {
    console.log("changed", value);
  };
  const onFinish = async (values) => {
    if (!isAdmin) {
      message.error("You're not an admin");
      return;
    }
    console.log("Success:", values);

    let uri1;
    console.log(uri1);
    if (values.productImage) {
      let hero = await resizeFile(values.productImage.file.originFileObj).then(
        (uri) => {
          uri1 = uri;

          let hero1 = { ...values, avatar: uri };
          return hero1;
        }
      );
    } else if (product.images) {
      uri1 = product.images;
    }
    if (uri1 === undefined) {
      message.error("Upload image for product!");
      return;
    }
    console.log(uri1);
    const formm = new FormData();
    formm.append("title", values.productname);
    formm.append("description", values.description);
    formm.append("price", values.price);
    formm.append("content", values.content);
    if (productCategory.name !== values.category) {
      formm.append("category", values.category);
    } else formm.append("category", productCategory._id);
    formm.append("images", uri1);

    if (onEdit) {
      await productService.putProduct(formm, product._id).then(
        (response) => {
          console.log(response);
          message.success("update product successfully");
          form.resetFields();
          // setSrcUploadImage(initImage);
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
    } else {
      await productService.createProduct(formm).then(
        (response) => {
          console.log(response);
          message.success("create product successfully");
          form.resetFields();
          setSrcUploadImage(initImage);
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
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setTimeout(() => {
      message.error({
        content: `Create product fail`,
        key,
        duration: 2,
      });
    }, 1000);
  };

  const props = {
    name: "file",
    onChange(info) {
      const nextState = {};
      switch (info.file.status) {
        case "uploading":
          nextState.selectedFileList = [info.file];
          console.log(info.file, info.fileList);
          break;
        case "done":
          nextState.selectedFile = info.file;
          nextState.selectedFileList = [info.file];

          break;

        default:
          // error or removed
          nextState.selectedFile = null;
          nextState.selectedFileList = [];
      }
      setState(nextState);
    },
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  useEffect(() => {
    if (params.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === params.id) {
          let found = categories.find(
            (category) => category._id === product.category
          );
          console.log(found);
          setProduct(product);
          setProductCategory(found);
          setSrcUploadImage(product.images);
          form.setFieldsValue({
            productname: product.title,
            price: product.price,
            description: product.description,
            content: product.content,
            category: found.name,
            _id: product._id,
          });
        }
      });
    } else {
      setOnEdit(false);
    }
  }, [params.id, products]);
  return (
    <div className="container-padding">
      <BackButton />
      <div className="description-containner">
        <Image className="image" src={srcUploadImage} />

        <Form
          form={form}
          style={{ width: "60%" }}
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          initialValues={
            product
              ? {
                productname: product.title,
                price: product.price,
                description: product.description,
                content: product.content,
                category: product.category,
                _id: product._id,
              }
              : {
                productname: "sdad",
                price: 0,
                description:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean cursus at massa nec euismod.",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla in nisi sed nisi sollicitudin venenatis. Aenean cursus at massa nec euismod. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
                category: "faf",
                _id: "",
              }
          }
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Card>
            <Form.Item
              label="Tên sản phẩm"
              name="productname"
              rules={[
                {
                  required: true,
                  message: "Product name",
                },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Ảnh"
              name="productImage"
              rules={[
                {
                  required: false,
                  message: "Upload image",
                },
              ]}
            >
              <Upload
                {...props}
                fileList={state.selectedFileList}
                customRequest={dummyRequest}
                style={{ width: "100%" }}
              >
                <Button icon={<UploadOutlined />}>Tải Ảnh</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Mô tả sản phẩm"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Description.",
                },
              ]}
            >
              <Input.TextArea style={{ minHeight: "100px" }} />
            </Form.Item>
            <Form.Item
              label="Điểm nổi bật"
              name="content"
              rules={[
                {
                  required: true,
                  message: "Product content.",
                },
              ]}
            >
              <Input.TextArea style={{ minHeight: "100px" }} />
            </Form.Item>

            <Form.Item
              label="Giá bán"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Product price.",
                },
              ]}
            >
              <InputNumber min={0} />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Product category.",
                },
              ]}
            >
              <Select>
                {categories.map((category) => {
                  return (
                    <Option value={category._id} key={category._id}>
                      {category.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row-reverse",
              }}
            >
              <Button
                style={{ left: "0px", marginTop: "30px" }}
                type="primary"
                htmlType="submit"
              >
                {onEdit ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Card>
        </Form>
      </div>
    </div>
  );
};
export default CreateProduct;
