
import {
    Card,
    Descriptions,
    Pagination,
    Checkbox,
    Space,
    Rate,
    Button,
    message,
    Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Filter from "~/components/filter";

const { Meta } = Card;
const pageSize = 5;
const RootLayout = () => {
    return <Filter />
};
export default RootLayout;
