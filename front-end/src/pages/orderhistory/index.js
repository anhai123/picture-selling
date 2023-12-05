import React, { useContext } from "react";
import { Space, Table, Tag, Layout, Typography, Tabs } from "antd";
import "./orderhis.css";
import BackButton from "../../components/BackButton";
import { GlobalState } from "../../GlobalState";
import { Link } from "react-router-dom";
import SHOPEnum from "../../helper/SHOPEnum";
import userService from "../../services/user.service";
import { useState } from "react";
const { Title, Text } = Typography;
const { Header, Footer, Sider, Content } = Layout;
let items = [];
const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  console.log(history)
  const [dataHistoryPurchase, setDataHistoryPurchase] = useState(mapDataIntoTable(history))

  function mapDataIntoTable(arrayHistoryPurchase) {
    return arrayHistoryPurchase.map((his) => {
      return {
        paymentId: his._id,
        purchaseDate: new Date(his.createdAt).toLocaleDateString(),
      };
    });
  }

  const onChangeTabStatus = async (type) => {
    console.log(type);
    let page = 1;
    let limit = 30
    const dataHistoryType = await userService.getUserHistoryType({ type, page, limit })
    setDataHistoryPurchase(mapDataIntoTable(dataHistoryType))
  };
  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "paymentId",
      key: "PaymentI",
      render: (text) => <span>{text}</span>,
      width: "40%",
    },
    {
      title: "Ngày mua",
      dataIndex: "purchaseDate",
      key: "date_purchased",
      width: "45%",
    },

    {
      title: "Thao tác",
      key: "action",
      render: (_, record) => (
        <Link
          to={`${record.paymentId}`}
          className="font-bold underline text-blue-500"
        >
          Xem đơn hàng
        </Link>
      ),
    },
  ];

  items = Object.keys(SHOPEnum.orderStatuses).map(status => {
    return {
      label: SHOPEnum.orderStatuses[status],
      key: SHOPEnum.orderStatuses[status],
      children: (<>
        <h4 style={{ paddingLeft: "16px" }}>
          Bạn có  {dataHistoryPurchase.length} đơn
        </h4>
        <Table columns={columns} dataSource={dataHistoryPurchase} pagination={{
          position: ['topRight'],
        }} />
      </>),
    }
  });
  const allPurchase =
  {
    label: 'Tất cả',
    key: 'Tất cả',
    children: (<>
      <h4 style={{ paddingLeft: "16px" }}>
        Bạn có  {history.length} đơn
      </h4>
      <Table columns={columns} dataSource={mapDataIntoTable(history)} pagination={{
        position: ['topRight'],
      }} />
    </>),
  }


  let newTabWithAllPurchase = [allPurchase].concat(items) // [ 4, 3, 2, 1 ]
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
            Lịch sử
          </Title>
        </div>
        {/* <div style={{ clear: "both" }}></div> */}
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div >
          <Tabs defaultActiveKey="1" items={newTabWithAllPurchase} onChange={onChangeTabStatus} />
        </div>
        {/* <h4 style={{ paddingLeft: "16px" }}>
          You have {history.length} orders
        </h4>
        <Table columns={columns} dataSource={dataHistoryPurchase} pagination={{
          position: ['none', 'none'],
        }} /> */}
      </Content>
    </Layout>
  );
};

export default OrderHistory;
