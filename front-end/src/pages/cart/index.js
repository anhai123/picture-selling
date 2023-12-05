import React, { useContext, useState, useEffect } from "react";
import {
  Avatar,
  Button,
  List,
  Skeleton,
  Card,
  InputNumber,
  Typography,
  Image,
  Modal,
  Input,
  Form,
  message,
} from "antd";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import "./cart.css";
import EmptyCartPage from "./EmtyCart";
import { GlobalState } from "../../GlobalState";
import axios from "axios";
import { Link } from "react-router-dom";
import userService from "../../services/user.service";
import paymentService from "../../services/payment.service";

const { Text } = Typography;
const Cart = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const state = useContext(GlobalState);
  const addToCartApi = state.userAPI.addCart
  const [cart, setCart] = state.userAPI.cart;
  const [userInfo] = state.userAPI.userInfo
  const [total, setTotal] = useState(0);
  const [callback, setCallback] = state.userAPI.callback;

  const [list, setList] = useState([
    {
      picture:
        "https://ichef.bbci.co.uk/news/999/cpsprodpb/15951/production/_117310488_16.jpg",
      name: "loosd",
    },
  ]);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);
  console.log("CART", cart);

  const addToCart = async (cart) => {
    console.log(userInfo._id)
    userService.patchItemInCart(userInfo._id, cart).then(
      (response) => {
        console.log(response);
        // message.success("update cart successfully");
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

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });

    setCart([...cart]); // nhu nay thi no se tao ra 1 arr moi (khac dia chi), neu khong no se so sanh la bang nhau (do co cung dia chi)
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity = item.quantity === 1 ? 1 : item.quantity - 1;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };
  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };


  const handleSubmit = (values) => {
    values = form.validateFields();

    values.then((val) => {
      paymentService.createPayment(cart, val.address).then(
        (response) => {
          console.log(response);
          message.success("Order successfully");
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
    });
  };

  const handleCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const handleChangeValueInputNumberQuantityProduct = (val, productId) => {
    cart.forEach((item) => {
      if (item._id === productId) {
        item.quantity = val < 0 ? 1 : val;
      }
    });

    setCart([...cart]);
    addToCart(cart);
  }
  const handleBuyNow = () => {
    Modal.confirm({
      title: "Please enter your address",
      content: (
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      ),
      onOk: form.submit,
      okText: "OK",
      cancelText: "Cancel",
    });
  };
  if (cart.length === 0) {
    return <EmptyCartPage />;
  } else
    return (
      <>
        <List
          style={{ backgroundColor: 'var(--background-color-little-white)' }}
          className="demo-loadmore-list"
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <Card style={{ backgroundColor: 'var(--background-color-little-white)' }}>
              {cart.map((product) => {
                return (
                  <List.Item
                    style={{ backgroundColor: 'var(--background-color-white)' }}
                    actions={[
                      <Text code strong>
                        VND {product.price * product.quantity}
                      </Text>,
                      <InputNumber
                        key={product._id}
                        onChange={(val) => handleChangeValueInputNumberQuantityProduct(val, product._id)}
                        // onStep={(value, info) =>
                        //   handleChangeProductNumber(value, info, product._id)
                        // }
                        min={1}
                        defaultValue={product.quantity}
                      ></InputNumber>,
                      <a key="list-loadmore-edit">
                        <DeleteOutlined
                          onClick={() => removeProduct(product._id)}
                        />
                      </a>,
                    ]}
                  >
                    <Skeleton
                      avatar
                      title={false}
                      loading={item.loading}
                      active
                    >
                      <List.Item.Meta
                        avatar={<Image width={200} src={product.images} />}
                        title={<h2>{product.title}</h2>}
                        description={product.description}
                      />
                    </Skeleton>
                  </List.Item>
                );
              })}
            </Card>
          )}
        />
        <div
          style={{
            display: "flex",
            paddingTop: "0px",
            justifyContent: "space-between",
            padding: "24px",
          }}
        >
          <Text code strong style={{ fontSize: "30px" }}>
            Total: VND {total}
          </Text>
          <Button type="primary" danger onClick={handleBuyNow}>Buy now</Button>
        </div>
      </>
    );
};
export default Cart;
