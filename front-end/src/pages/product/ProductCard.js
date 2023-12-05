import {
  Card,
  Descriptions,
  Pagination,
  Checkbox,
  Space,
  Rate,
  Typography,
  message,
  Popconfirm,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
const { Meta } = Card;
const { Text, Paragraph } = Typography;

const ProductCard = ({ product, isAdmin, deleteProduct, handleCheck }) => {
  const handleClickImageEvent = () => { };
  const handelDeleteProduct = () => { };
  const state = useContext(GlobalState)
  const confirm = (e) => {
    console.log(e);
    deleteProduct(product._id);
  };
  const cancel = (e) => {
    console.log(e);
  };
  return (
    <>
      <Card
        hoverable
        bordered={true}
        className="card-layout"
        cover={
          <img
            alt="example"
            src={product.images}
            className="postImage"
            onClick={() => handleClickImageEvent(product)}
          />
        }
        actions={
          isAdmin && [
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined key="delete" />
            </Popconfirm>,
            <Checkbox
              key="checkbox"
              checked={product.checked}
              onClick={() => handleCheck(product._id)}
            />,
          ]
        }
      >
        <Link
          to={
            isAdmin ? `edit_product/${product._id}` : `detail/${product._id}`
          }
          replace={true}
        >
          <Meta
            title={product.title}
            description={
              <>
                <Text code strong>
                  {product.price} $
                </Text>
                <Text
                  style={{ width: "120px" }}
                  ellipsis={{
                    rows: 3,
                  }}
                >
                  {product.content}
                </Text>
                <Space.Compact
                  block
                  style={{ justifyContent: "space-between" }}
                >
                  <StarRatings
                    rating={
                      product.numReviews > 0
                        ? product.star / product.numReviews
                        : 0
                    }
                    starDimension="15px"
                    starSpacing="4px"
                    starRatedColor="rgb(230, 67, 47)"
                  />
                  {/* <Rate style={{ fontSize: "14px" }}></Rate> */}
                  <span>Sold: {product.sold ? product.sold : 0}</span>
                </Space.Compact>
              </>
            }
          />
        </Link>
      </Card>
    </>
  );
};
export default ProductCard;
