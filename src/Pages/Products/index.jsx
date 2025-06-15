import { useGetAllProductsQuery } from "@/service/product";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./Products.module.scss"
const cx = classNames.bind(styles)
function Products() {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p className={cx("loading")}>Đang tải dữ liệu...</p>;

  const products = data?.data?.items || [];

  return (
    <div className={cx("container")}>
      <div className={cx("productGrid")}>
        {products.map((product) => (
          <Link 
            to={`/products/${product.slug}`} 
            key={product.id} 
            className={cx("productCard")}
          >
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className={cx("productImage")} 
            />
            <div className={cx("productInfo")}>
              <h3 className={cx("productTitle")}>{product.title}</h3>
              <p className={cx("productPrice")}>{product.price}đ</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Products;
