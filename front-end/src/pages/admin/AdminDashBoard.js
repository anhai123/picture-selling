import {
    BarChart,
    LineChart,
    PieChart
} from '../../components/charts';
import './css/dashboard.css'
import React from 'react';
import { Avatar, List, Space, Col, Row } from 'antd';
import { SnippetsOutlined, WifiOutlined, AliwangwangOutlined } from "@ant-design/icons";
const data = [
    {
        icon: <WifiOutlined />,
        title: 'Doanh thu trong ngày',
    },
    {
        icon: <AliwangwangOutlined />,
        title: 'Số khách hàng mới',
    },
    {
        icon: <SnippetsOutlined />,
        title: 'Tổng số người mua',
    },
    {
        icon: <SnippetsOutlined />,
        title: 'Lượt đặt hàng mới',
    },
];



const AdminDashBoard = () => {

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
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                />
                            </List.Item>
                        )}
                    /></Col>
                <Col span={12}><BarChart></BarChart></Col>
            </Row>


            {/* <LineChart></LineChart> */}
            {/* <PieChart></PieChart> */}
        </div>
    )
}
export default AdminDashBoard
