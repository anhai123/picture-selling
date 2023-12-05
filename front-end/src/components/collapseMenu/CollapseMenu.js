import React, { useState } from 'react';
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    FilterOutlined,
    ShopOutlined
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useContext } from 'react';
import { GlobalState } from '../../GlobalState';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
let items = [];
const CollapseMenu = () => {
    const state = useContext(GlobalState)
    const [categories] = state.categoriesAPI.categories;
    const [search, setSearch] = state.productsAPI.search;
    const [categorySelected, setCategorySelected] =
        state.productsAPI.categorySelected;
    const [sort, setSort] = state.productsAPI.sort;

    let ItemsCategory = []
    const handleCategory = (value) => {
        setCategorySelected(value);
        setSearch("");
    };
    const handleClickSorting = (value) => {
        console.log(`selected ${value}`);
        setSort(value);
    };
    if (categories) {
        let none = [
            getItem((
                <span
                    onClick={() => handleCategory("")}
                    key={'none'}
                >
                    Bỏ chọn
                </span>
            ), 'none')
        ]


        ItemsCategory = categories.map((category) => {
            return getItem((
                <span
                    onClick={() => handleCategory("category=" + category._id)}
                    key={category._id}
                >
                    {category.name}
                </span>
            ), category._id)
        });
        ItemsCategory = none.concat(ItemsCategory)
    }
    let sorting = [
        {
            key: "sort=newest",
            label: <span onClick={() => handleClickSorting('')}>Bỏ lọc</span>,
        },
        {
            key: "sort=oldest",
            label: <span onClick={() => handleClickSorting('sort=oldest')}>Cũ nhất</span>,
        },
        {
            key: "sort=-sold",

            label: <span onClick={() => handleClickSorting('sort=-sold')}>Bán chạy</span>,
        },
        {
            key: "sort=-price",
            label: <span onClick={() => handleClickSorting('sort=-price')}>Giá: cao - thấp</span>,
        },
        {
            key: "sort=price",
            label: <span onClick={() => handleClickSorting('sort=price')}>Giá: thấp - cao</span>,
        },
    ]
    if (sorting) {
        sorting = sorting.map((sort) => {
            return getItem(sort.label, sort.key)
        });
    }
    items = [getItem('Danh mục sản phẩm', 'category', <ShopOutlined />, ItemsCategory),
    getItem('Bộ lọc', 'filter', <FilterOutlined />, sorting)]
    console.log(ItemsCategory)
    return (
        <div
            style={{
                width: 240,
                position: 'sticky',
                top: '80px'
            }}
        >
            <Menu
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                items={items}
            />
        </div>
    );
};
export default CollapseMenu;
