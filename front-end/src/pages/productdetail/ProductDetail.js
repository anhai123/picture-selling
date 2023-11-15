import React, { useContext, useEffect, useState } from "react";
import BackButton from "../../components/BackButton";
import CommentCreateForm from "../../components/commentCreateForm";
import CommentItem from "../../components/commentItem";
import { Rate, Card, Image, Row, Col, Typography, Button, message } from "antd";
import ProductCard from "../product/ProductCard";
import StarRatings from "react-star-ratings";
import "./productDetail.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
const { Text, Title } = Typography;
const ProductDetail = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [userInfo] = state.userAPI.userInfo;
  const [isLogged] = state.userAPI.isLogged;

  const socket = state.socket;
  const [productDetail, setProductDetail] = useState({});
  const [loading, setLoading] = useState(false);

  // comment
  const [comments, setComments] = useState([]);
  const [pageComment, setPageComment] = useState(1);
  const [resultComment, setResultComment] = useState(0);
  const [callbackComment, setCallbackComment] = useState(false);
  // const products = [
  //   {
  //     category: 1,
  //   },
  // ];

  useEffect(() => {
    const getComments = async () => {
      const response = await axios.get(
        `http://localhost:9001/api/comments/${params.id}?limit=${pageComment * 5
        }`
      );
      setComments(response.data.comments);
      setResultComment(response.data.result);
    };

    getComments();
    console.log("TIm comment");
  }, [params.id, pageComment, callbackComment]);

  useEffect(() => {
    console.log(socket);
    if (socket) {
      console.log("gui tra comment nay");

      socket.on("sendCommentToClient", (data) => {
        setComments([data, ...comments]);
        console.log(data);
      });

      return () => socket.off("sendCommentToClient");
    }
  }, [socket, comments]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
        }
      });
    }
  }, [params.id, products]);

  useEffect(() => {
    if (socket && userInfo) {
      console.log("join room");
      socket.emit("joinRoom", { userId: userInfo?._id, roomId: params.id });
    }
  }, [socket, params.id, userInfo]);

  // if (productDetail.length === 0) {
  //   return null;
  // }

  return (
    <div>
      <Card>
        <div>
          <BackButton />
        </div>
        <div className="description-containner1">
          <Image className="image" src={productDetail.images} />

          <Card
            title={productDetail.title}
            bordered={false}
            style={{ width: "50%" }}
          >
            <p>
              <Text code strong>
                $ {productDetail.price}
              </Text>
            </p>
            <p>{productDetail.content}</p>
            <Text strong>Sold: {productDetail.sold}</Text>
            <div>
              <StarRatings
                rating={
                  productDetail.numReviews > 0
                    ? productDetail.star / productDetail.numReviews
                    : 0
                }
                starDimension="15px"
                starSpacing="4px"
                starRatedColor="rgb(230, 67, 47)"
              />
              <Text style={{ fontSize: "30px", paddingLeft: "1rem" }} strong>
                {productDetail.numReviews > 0
                  ? (productDetail.star / productDetail.numReviews).toFixed(1)
                  : (0.01).toFixed(1)}
                /5.0
              </Text>
            </div>
            <p>
              <Button
                type="primary"
                onClick={() => {
                  addCart(productDetail);
                }}
              >
                Add to cart
              </Button>
            </p>
          </Card>
        </div>
      </Card>

      <Card>
        {isLogged && (
          <CommentCreateForm
            id={params.id}
            callbackComment={callbackComment}
            setCallbackComment={setCallbackComment}
          />
        )}
        <CommentItem />

        {comments.length === 0 ? (
          <p
            className="text-center text-lg"
            style={{
              textAlign: "center",
              fontSize: "1.125rem",
              lineHeight: "1.75rem",
            }}
          >
            There are no reviews yet.
          </p>
        ) : (
          <>
            {comments !== undefined &&
              comments.map((comment, index) => (
                <CommentItem key={index} comment={comment} />
              ))}

            {resultComment < pageComment * 5 ? (
              ""
            ) : (
              <div style={{ textAlign: "center" }}>
                <span
                  style={{
                    textAlign: "center",
                    fontSize: "1.125rem",
                    lineHeight: "1.75rem",
                  }}
                  onClick={() => {
                    setPageComment((prev) => prev + 1);
                  }}
                >
                  Load More
                </span>
              </div>
            )}
          </>
        )}
      </Card>

      <Title level={3}>RELATED PRODUCT</Title>
      <div className="site-card-border-less-wrapper">
        {products.map((product) =>
          product.category === productDetail.category ? (
            <ProductCard key={product._id} product={product} />
          ) : null
        )}
      </div>
    </div>
  );
};
export default ProductDetail;
