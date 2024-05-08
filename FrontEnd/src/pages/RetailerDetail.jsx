import { useParams } from "react-router-dom";

function RetailerDetail() {
  const { id } = useParams();
  return <div>{id}</div>;
}

export default RetailerDetail;
