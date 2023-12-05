
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
import { Outlet, NavLink, useLocation, Link, Route, Routes } from "react-router-dom"
import CollapseMenu from "../components/collapseMenu/CollapseMenu";
import "./rootlayout.css"
const { Meta } = Card;
const pageSize = 5;
const RootLayout = () => {
    return <div className="root-layout" >
        <main style={{ backgroundColor: '#f5f5f5' }}>
            <Outlet />
        </main>
    </div>
};
export default RootLayout;
