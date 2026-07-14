import { useParams } from "react-router-dom";

const categories = ["shirts", "hoodies", "pants", "shoes", "jackets"];

function ShopCategory() {
  const { category } = useParams();
  if (!category) return;

  if (!categories.includes(category.toLowerCase()))
    throw "This Category is not included in the store";

  console.log(category);

  return <div></div>;
}

export default ShopCategory;
