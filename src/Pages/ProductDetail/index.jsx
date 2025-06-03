import { useParams } from "react-router-dom";
import { useGetDetailProductQuery } from "@/service/product";

const ProductDetail = () => {
  const params = useParams();
  const slug = params.slug;

  const { data, isLoading } = useGetDetailProductQuery(slug);

  if (isLoading) return <p>Loading...</p>;

  const product = data.data;

  return (
    <div>
      <h1 style={{ color: "red", fontSize: 40 }}>{product.title}</h1>
      <img src={product.thumbnail} alt={product.title} />
    </div>
  );
};

export default ProductDetail;
