import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Breadcrumb,
  Layout,
  Menu,
  theme,
  Input,
  Space,
  Badge,
} from "antd";
import "./header.css";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import authService from "../../services/auth.service";
import { GlobalState } from "../../GlobalState";
const { Search } = Input;
const { Header, Content, Footer } = Layout;
const { Text } = Typography;

const HeaderCom = () => {
  const location = useLocation();
  let routePathPattern = location.pathname;
  console.log("routePathPattern", routePathPattern);
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;
  const [cart, setCart] = state.userAPI.cart;
  const [search, setSearch] = state.productsAPI.search;
  const [categories] = state.categoriesAPI.categories;
  const [categorySelected, setCategorySelected] =
    state.productsAPI.categorySelected;

  const handleCategory = (value) => {
    setCategorySelected(value);
    setSearch("");
  };

  const logoutUser = async () => {
    authService.logout();

    window.location.href = "/"; // refresh page
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const adminRouter = [
    {
      key: "create_product",
      label: <Link to="/create_product">Create Product</Link>,
    },
    {
      key: "categories",
      label: <Link to="/categories">Categories</Link>,
    },

    {
      key: "history",
      label: <Link to="/history">History</Link>,
    },
    isLogged && {
      key: "logout",
      label: (
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      ),
    },
  ];

  const loggedRouter = [
    isLogged && {
      key: "history",
      label: <Link to="/history">History</Link>,
    },
    isLogged && {
      key: "logout",
      label: (
        <Link to="/" onClick={logoutUser}>
          Logout
        </Link>
      ),
    },
    {
      key: "cart",
      label: (
        <Badge count={cart.length} size="small">
          <Link to="/cart">
            <ShoppingCartOutlined
              style={{ fontSize: "24px", color: "white" }}
              size="medium"
            />
          </Link>
        </Badge>
      ),
    },
  ];

  let ItemsNavbar = [
    {
      key: "shop",
      label: <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>,
    },
    !isLogged && {
      key: "loginRegis",
      label: <Link to="/login">Login / Register</Link>,
    },

    ...loggedRouter,
  ];
  if (isAdmin) {
    ItemsNavbar = [
      {
        key: "shop",
        label: <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>,
      },

      ...adminRouter,
    ];
  }
  let ItemsCategory = [];
  let getAllProduct = {
    key: "allProduct",
    label: (
      <span onClick={() => handleCategory("")} key="allProduct">
        All products
      </span>
    ),
  };
  if (categories) {
    ItemsCategory = categories.map((category) => {
      return {
        key: category._id,
        label: (
          <span
            onClick={() => handleCategory("category=" + category._id)}
            key={category._id}
          >
            {category.name}
          </span>
        ),
      };
    });
  }

  ItemsCategory = [getAllProduct].concat(ItemsCategory);

  return (
    <Layout className="layout">
      <Header style={{ boxSizing: "border-box", height: "8rem" }}>
        <div className="site-space-compact-wrapper">
          <Space.Compact block>
            <Text
              style={{
                color: "white",
                width: "10%",
                position: "relative",
                fontSize: "1.438rem",
                transform: "translate(0%, 20%)",
                marginRight: "3rem",
              }}
              italic
            >
              <Link to="/">{isAdmin ? "Admin" : "Kaimono"}</Link>
            </Text>
            <Input.Search
              style={{
                position: "relative",
                width: "50%",
                maxWidth: "60%",
                /* top: 50%; */
                /* left: 50%; */
                transform: "translate(0%, 25%)",
              }}
              defaultValue="0571"
              value={search}
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              items={ItemsNavbar}
              style={{
                width: "30%",
                display: "flex",
                justifyContent: "space-evenly",
              }}
            />

            <br />
          </Space.Compact>
          {routePathPattern === "/" ? (
            <Space.Compact block>
              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                items={ItemsCategory}
                style={{
                  width: "100%",
                  /* position: relative, */
                  display: "flex",
                  justifyContent: "flex-start",
                }}
              />
            </Space.Compact>
          ) : (
            <> </>
          )}
        </div>
      </Header>
      <Content
        style={{
          padding: "0 50px",
        }}
      >
        <div
          className="site-layout-content"
          style={{
            background: colorBgContainer,
          }}
        ></div>
      </Content>
    </Layout>
  );
};
export default HeaderCom;
