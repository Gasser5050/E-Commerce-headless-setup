import { useParams } from "react-router-dom";
import ShopCategory from "../pages/ShopCategory";

function ShopCategoryWrapper() {
  const { category } = useParams();

  return <ShopCategory key={category} />;
}

export default ShopCategoryWrapper;
