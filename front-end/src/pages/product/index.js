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
  Layout
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Filter from "../../components/filter";
import { DeleteOutlined } from "@ant-design/icons";
import ProductCard from "./ProductCard";
import { GlobalState } from "../../GlobalState";
import productService from "../../services/product.service";
import CollapseMenu from "../../components/collapseMenu/CollapseMenu";
const { Header, Footer, Sider, Content } = Layout;
const { Meta } = Card;
const pageSize = 5;
const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};
const contentStyle = {
  minHeight: 120,
};
const siderStyle = {
  lineHeight: '120px',
  color: '#fff',
  width: '240px',
  paddingTop: "1rem"
};
const footerStyle = {
  textAlign: 'center',
  color: '#fff',

};
const ProductList = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;

  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [page, setPage] = state.productsAPI.page
  const [totalProduct, setTotalProduct] = state.productsAPI.totalProduct
  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };


  const handleChange = (page, pageSize) => {
    console.log(page)
    console.log(pageSize)
    setPage(page)
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
      <Layout>
        <Sider style={siderStyle} width={240}>
          <CollapseMenu />
        </Sider>
        <Layout>
          <Content style={contentStyle}>
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
            <div className="product-list-containner">

              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  handleCheck={handleCheck}
                  deleteProduct={deleteProduct}
                />
              ))}
            </div>
          </Content>
          {/* <Footer style={footerStyle}>
            <div className="pagination-containner">
              <Pagination
                defaultCurrent={1}
                total={totalProduct}
                onChange={handleChange}
                style={{ bottom: "0px !important" }}
                defaultPageSize={6}
              />
            </div> </Footer> */}
        </Layout>
      </Layout>
    </div >
  );
};
export default ProductList;
