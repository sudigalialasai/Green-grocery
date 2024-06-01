import { useSelector } from "react-redux";
export default function nothing() {
  const search = useSelector((state) => state.product.search);
  console.log(search, "from somewhere ");
  return <></>;
}
