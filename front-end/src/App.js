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
import io from "socket.io-client";
import { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalState } from "./GlobalState";
import RootLayout from "./layout/RootLayut";
const App = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  console.log("isAdmin", isAdmin, "isLogged", isLogged);
  console.log(state);
  return (
    <>
      {/* <HeaderCom />
      <ProductList /> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <CommentCreateForm /> */}
      {/* <CommentItem /> */}
      {/* <Cart /> */}
      {/* <ProductDetail /> */}
      {/* <OrderHistory /> */}
      {/* <OrderDetail /> */}
      {/* <ProductCategories /> */}
      {/* <CreateProduct /> */}
      <div>
        <Router>
          <HeaderCom />
          {/* <CollapseMenu /> */}
          <div style={{ width: "100%", }}>
            <Routes>
              <Route path="shopping/" element={<RootLayout />}>
                <Route path="product" element={<ProductList />} />
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
                  path="create_product"
                  element={isAdmin ? <CreateProduct /> : <NotFound />}
                />
                <Route
                  path="edit_product/:id"
                  element={isAdmin ? <CreateProduct /> : <NotFound />}
                />
                <Route path="cart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
              </Route>

            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
};

export default App;
