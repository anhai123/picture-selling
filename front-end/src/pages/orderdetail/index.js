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
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "date_purchased",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
    render: (value) => (
      <Text code strong>
        {value} $
      </Text>
    ),
  },
];
const data = [
  {
    picture:
      "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/great-ocean-road-174028267-1494616481.jpg",
    productName: "as",
    quantity: "as",
    price: 8,
  },
  {
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsoPnFcoNqTf791Kjly9Koahf_Uiz0VXoFykP0NwORCTk91dGfto4uyky9qPaYxOGdrw&usqp=CAU",
    productName: "as",
    quantity: "as",
    price: 8,
  },
  {
    picture:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_md5iMScdvNnM14O_TRdcNE81odhOxSUpw&usqp=CAU",
    productName: "as",
    quantity: "as",
    price: 8,
  },
];
const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);
  const [data1, setData] = useState([]);
  console.log("HISTORY", history);
  const data = [
    {
      picture:
        "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/great-ocean-road-174028267-1494616481.jpg",
      productName: "as",
      quantity: "as",
      price: 8,
    },
    {
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbsoPnFcoNqTf791Kjly9Koahf_Uiz0VXoFykP0NwORCTk91dGfto4uyky9qPaYxOGdrw&usqp=CAU",
      productName: "as",
      quantity: "as",
      price: 8,
    },
    {
      picture:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK_md5iMScdvNnM14O_TRdcNE81odhOxSUpw&usqp=CAU",
      productName: "as",
      quantity: "as",
      price: 8,
    },
  ];
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
        <Content>
          <div className="header-item-height">
            <Text strong>Name: {orderDetail.name} </Text>
          </div>
          <div className="header-item-height">
            <Text strong>Address: {orderDetail.address} </Text>
          </div>

          {/* <div style={{ clear: "both" }}></div> */}
          <Table columns={columns} dataSource={data1} />
        </Content>
      </Card>
    </Layout>
  );
};

export default OrderDetail;
