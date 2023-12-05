import React, { useEffect, useState } from "react";
import axios from "axios";
const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);
  const [totalProduct, setTotalProduct] = useState(0);

  useEffect(() => {
    const getProducts = async () => {
      const response = await axios.get(
        `http://localhost:9001/products?limit=${5
        }&page=${page}&${categorySelected}&${sort}&title[regex]=${search}`
      );

      // const response = await axios.get(`/products`);
      console.log(response.data.products);
      setProducts(response.data.products);
      setResult(response.data.result);
      setTotalProduct(response.data.totalProduct)
    };
    getProducts();
  }, [callback, categorySelected, sort, search, page]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    categorySelected: [categorySelected, setCategorySelected],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
    totalProduct: [totalProduct, setTotalProduct]
  };
};

export default ProductsAPI;
