import {
    BarChart,
    LineChart,
    PieChart
} from '../../components/charts';
import './css/dashboard.css'
import React from 'react';
import { Avatar, List, Space, Col, Row } from 'antd';
import { SnippetsOutlined, WifiOutlined, AliwangwangOutlined } from "@ant-design/icons";
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';




const AdminDashBoard = () => {
    const state = useContext(GlobalState)
    let [statisticInfo, setStatisticInfo] = state.userAPI.statistic
    console.log(statisticInfo)
    const data = [
        {
            icon: <WifiOutlined />,
            title: 'Doanh thu trong ngày',
            description: statisticInfo.dailyRevenue
        },
        {
            icon: <AliwangwangOutlined />,
            title: 'Số khách hàng mới',
            description: statisticInfo.newUserCount
        },
        {
            icon: <SnippetsOutlined />,
            title: 'Tổng số người mua',
            description: statisticInfo.totalUserCount
        },
        {
            icon: <SnippetsOutlined />,
            title: 'Lượt đặt hàng mới',
            description: statisticInfo.totalPaymentCount
        },
    ];
    return (
        <div style={{ height: '100vh' }} className='container-padding'>

            <Row style={{ backgroundColor: 'var(--background-color-white)', padding: '10px' }}>
                <Col span={12}>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar icon={item.icon} style={{
                                        backgroundColor: '#87d068',
                                    }} />}
                                    title={<a href="https://ant.design">{item.title}</a>}
                                    description={item.description}
                                />
                            </List.Item>
                        )}
                    /></Col>
                <Col span={12}><BarChart dataBarChart={statisticInfo.paymentsTotalMonth}></BarChart></Col>
            </Row>


            {/* <LineChart></LineChart> */}
            {/* <PieChart></PieChart> */}
        </div>
    )
}
export default AdminDashBoard
