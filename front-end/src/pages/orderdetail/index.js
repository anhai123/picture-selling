import React, { useContext, useEffect, useState } from "react";
import { Space, Table, Tag, Layout, Typography, Image, Card } from "antd";

import BackButton from "../../components/BackButton";
import { render } from "react-dom";
import "./orderdetail.css";
import { Link, useParams } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const columns = [
  {
    title: "Picture",
    dataIndex: "picture",
    key: "PaymentI",
    render: (src) => <Image src={src} />,
    width: "40%",

  },
  {
    title: "Product",
    dataIndex: "productName",
    key: "date_purchased",
    render: (value) => (
      <Text style={{ fontSize: '30px' }} strong>
        {value}
      </Text>
    ),
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "date_purchased",
    render: (value) => (
      <Text style={{ fontSize: '30px' }} strong>
        {value}
      </Text>
    ),
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value) => (
      <Text style={{ fontSize: '30px' }} code strong>
        {value} $
      </Text>
    ),
  },
];

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);
  const [data1, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) {
          setOrderDetail(item);
        }
      });
      if (orderDetail.cart) {
        setData(
          orderDetail.cart.map((item) => {
            return {
              picture: item.images,
              productName: item.title,
              quantity: item.quantity,
              price: item.price * item.quantity,
            };
          })
        );
      }
    }
  }, [params.id, history, orderDetail]);

  if (orderDetail.length === 0) {
    return null;
  }
  return (
    <Layout>
      <Card>
        <BackButton />
        <Content >
          <div className="header-item-height">
            <Text strong>Name: {orderDetail.name} </Text>
          </div>
          <div className="header-item-height">
            <Text strong>Address: {orderDetail.address} </Text>
          </div>

          {/* <div style={{ clear: "both" }}></div> */}
          <Table pagination={{
            position: ['none', 'none'],
          }} columns={columns} dataSource={data1} scroll={{
            y: 400,
          }} />
        </Content>
      </Card>
    </Layout>
  );
};

export default OrderDetail;
