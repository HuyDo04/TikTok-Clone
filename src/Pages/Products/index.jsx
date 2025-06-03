import { useGetAllProductsQuery } from "@/service/product";
import { Link } from "react-router-dom";
function Products() {
  const { data, isLoading } = useGetAllProductsQuery();

  if (isLoading) return <p>Đang tải dữ liệu...</p>;

  const products = data.data.items;

  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.slug}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Products;
