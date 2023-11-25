import React, { useContext } from "react";
import { Space, Table, Tag, Layout, Typography } from "antd";
import "./orderhis.css";
import BackButton from "../../components/BackButton";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
const columns = [
  {
    title: "Payment code",
    dataIndex: "paymentId",
    key: "PaymentI",
    render: (text) => <span>{text}</span>,
    width: "45%",
  },
  {
    title: "Date of Purchased",
    dataIndex: "purchaseDate",
    key: "date_purchased",
    width: "45%",
  },

  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Link
        to={`/history/${record.paymentId}`}
        className="font-bold underline text-blue-500"
      >
        View
      </Link>
    ),
  },
];

const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  console.log(history);

  const data = history.map((his) => {
    return {
      paymentId: his._id,
      purchaseDate: new Date(his.createdAt).toLocaleDateString(),
    };
  });
  return (
    <Layout>
      <Header style={{ backgroundColor: "#0000f642" }}>
        <div>
          <div style={{ display: "inline-block", verticalAlign: "top" }}>
            <BackButton />
          </div>
          <Title
            style={{
              position: "absolute",
              display: "inline-block",
              right: "50%",
              transform: "translate(50%,-50%)",
            }}
            level={1}
          >
            History
          </Title>
        </div>
        {/* <div style={{ clear: "both" }}></div> */}
      </Header>
      <Content>
        <h4 style={{ paddingLeft: "16px" }}>
          You have {history.length} orders
        </h4>
        <Table columns={columns} dataSource={data} pagination={{
          position: ['none', 'none'],
        }} />
      </Content>
    </Layout>
  );
};

export default OrderHistory;
