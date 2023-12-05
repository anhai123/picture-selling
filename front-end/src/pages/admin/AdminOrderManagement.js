import React from 'react';
import { Space, Table, Tag, Dropdown, Select } from 'antd';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
import { Link } from 'react-router-dom';
import SHOPEnum from '../../helper/SHOPEnum';
import userService from '../../services/user.service';
const AdminOrderManagement = () => {
    const state = useContext(GlobalState)
    const [history] = state.userAPI.history
    console.log(history)
    const handleChange = (value, paymentId) => {
        console.log(`selected ${value}`);
        userService.updatePaymentStatus(paymentId, value)
    };
    function mapDataIntoTable(arrayHistoryPurchase) {
        return arrayHistoryPurchase.map((his) => {
            return {
                paymentId: his._id,
                purchaseDate: new Date(his.createdAt).toLocaleDateString(),
                status: his.status
            };
        });
    }
    const handleClickDropdownItem = (status) => {

    }
    function mapDataIntoDropdown(objectStatus) {

        let statusArray = Object.keys(objectStatus).map(status => {
            return {
                value: SHOPEnum.orderStatuses[status],
                label: (
                    <span onClick={() => handleClickDropdownItem(SHOPEnum.orderStatuses[status])}>
                        {SHOPEnum.orderStatuses[status]}
                    </span>
                )

            }
        });
        return statusArray
    }
    let dataDropdown = mapDataIntoDropdown(SHOPEnum.orderStatuses)
    console.log(dataDropdown)
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
                <>
                    <Link
                        to={`${record.paymentId}`}
                        className="font-bold underline text-blue-500"
                    >
                        Xem đơn hàng
                    </Link>
                    <Select
                        defaultValue={record.status}
                        style={{
                            width: 120,
                        }}
                        onChange={(val) => handleChange(val, record.paymentId)}
                        options={dataDropdown}
                    />
                </>

            ),
        },
    ];

    return (
        <div className='container-padding'>
            <h4 style={{ paddingLeft: "16px" }}>
                Bạn có {history.length} đơn hàng
            </h4>
            <Table columns={columns} dataSource={mapDataIntoTable(history)} />
        </div>)
}
export default AdminOrderManagement;
