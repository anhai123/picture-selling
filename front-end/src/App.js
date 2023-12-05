import logo from "./logo.svg";
import "./App.css";
import HeaderCom from "./components/header";
import ProductList from "./pages/product";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import CommentCreateForm from "./components/commentCreateForm";
import CommentItem from "./components/commentItem";
import Cart from "./pages/cart";
import ProductDetail from "./pages/productdetail/ProductDetail";
import OrderHistory from "./pages/orderhistory";
import OrderDetail from "./pages/orderdetail";
import ProductCategories from "./pages/categories";
import CreateProduct from "./pages/createproduct";
import CollapseMenu from "./components/collapseMenu/CollapseMenu";
import NotFound from "./pages/notfound/Notfound";
import AdminOrderManagement from "./pages/admin/AdminOrderManagement";
import io from "socket.io-client";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalState } from "./GlobalState";
import RootLayout from "./layout/RootLayout";
import { AdminDashBoard } from "./pages/admin";
const App = () => {

  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  console.log("isAdmin", isAdmin, "isLogged", isLogged);

  if (window.location.pathname == '/') {
    window.location = "shopping"
  }
  return (
    <>
      <Router>
        <HeaderCom />
        {/* <CollapseMenu /> */}
        <div style={{ width: "100%", height: "100%" }}>
          <Routes>
            <Route path="shopping" element={<RootLayout />}>
              <Route index element={<ProductList />} />
              <Route path="detail/:id" element={<ProductDetail />} />
              <Route
                path="login"
                element={!isLogged ? <Login /> : <NotFound />}
              />
              <Route
                path="register"
                element={!isLogged ? <Register /> : <NotFound />}
              />
              <Route
                path="history"
                element={isLogged ? <OrderHistory /> : <NotFound />}
              />
              <Route
                path="history/:id"
                element={isLogged ? <OrderDetail /> : <NotFound />}
              />
              <Route
                path="categories"
                element={isAdmin ? <ProductCategories /> : <NotFound />}
              />
              <Route
                path="manage-order"
                element={isAdmin ? <AdminOrderManagement /> : <NotFound />}
              />
              <Route
                path="manage-order/:id"
                element={isLogged ? <OrderDetail /> : <NotFound />}
              />
              <Route
                path="create_product"
                element={isAdmin ? <CreateProduct /> : <NotFound />}
              />
              <Route
                path="edit_product/:id"
                element={isAdmin ? <CreateProduct /> : <NotFound />}
              />
              <Route
                path="statistic"
                element={isAdmin ? <AdminDashBoard /> : <NotFound />}
              />
              <Route path="cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </div>
      </Router>

    </>
  );
};

export default App;
