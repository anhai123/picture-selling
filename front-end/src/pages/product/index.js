import "./product.css";
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
import Filter from "../../components/filter";
import { DeleteOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { GlobalState } from "../../GlobalState";
import productService from "../../services/product.service";
const { Meta } = Card;
const pageSize = 8;
const ProductList = () => {
  const [product, setProduct] = useState(["helo"]);
  const handleChange = () => { };
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id) => {
    productService.deleteProduct(id).then(
      (response) => {
        console.log(response);
        message.success("delete product successfully");

        setCallback(!callback);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        console.log(_content);
        message.error(_content);
      }
    );
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheckAll;
    });
    setProducts([...products]);
    setIsCheckAll(!isCheckAll);
  };

  const confirm = (e) => {
    console.log(e);
    deleteAll();
  };
  const cancel = (e) => {
    console.log(e);
  };
  const deleteAll = async () => {
    const check = products.some((product) => {
      return product.checked === true;
    });
    if (check) {
      products.forEach((product) => {
        if (product.checked) {
          deleteProduct(product._id);
        }
      });
    }
  };

  return (
    <div className="site-card-border-less-wrapper">
      <Space.Compact block>
        <Filter />
        {isAdmin && (
          <Space.Compact
            block
            style={{ justifyContent: "flex-end", paddingRight: "40px" }}
          >
            <Checkbox checked={isCheckAll} onChange={checkAll}></Checkbox>

            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button> Delete all</Button>
            </Popconfirm>
          </Space.Compact>
        )}
      </Space.Compact>

      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          isAdmin={isAdmin}
          handleCheck={handleCheck}
          deleteProduct={deleteProduct}
        />
      ))}
      <Pagination
        pageSize={pageSize}
        current={1}
        total={product.length}
        onChange={handleChange}
        style={{ bottom: "0px !important" }}
      />
    </div>
  );
};
export default ProductList;
