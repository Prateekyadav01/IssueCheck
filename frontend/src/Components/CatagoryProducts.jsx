import { useParams } from "react-router-dom"

import HorizontalCardProduct from "../Components/Horizontalproduct"
const CatagoryProducts = () => {
  const params=useParams();
  console.log(params)
  return (
    <div>

<HorizontalCardProduct category={params.catagoryName}  heading={`Top's ${params.catagoryName}`} />
    </div>
  )
}

export default CatagoryProducts
