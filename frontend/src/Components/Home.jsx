
import CatagoryData from './CatagoryData';
import HorizontalCardProduct from './Horizontalproduct';
import ImageSlider from "./ImageSlider"

const Home = () => {
  return (
    <>
    <CatagoryData/>
    <ImageSlider/>
    <HorizontalCardProduct category={"earphone"}  heading={"Top's Airpodes"} />
    <HorizontalCardProduct category={"mobile"}  heading={"Top's Mobile"} />
    <HorizontalCardProduct category={"mouse"}  heading={"Top's Mouse"} />
    <HorizontalCardProduct category={"speaker"}  heading={"Top's speaker"} />
    <HorizontalCardProduct category={"airpods"}  heading={"Top's airpods"} />
    <HorizontalCardProduct category={"processor"}  heading={"Top's processor"} />
    <HorizontalCardProduct category={"watch"}  heading={"Top's watch"} />
    <HorizontalCardProduct category={"printer"}  heading={"Top's printer"} />
    <HorizontalCardProduct category={"trimmer"}  heading={"Top's trimmer"} />
    <HorizontalCardProduct category={"tv"}  heading={"Top's tv"} />
    <HorizontalCardProduct category={"refrigerator"}  heading={"Top's refrigerator"} />
    </>
   
  );
}

export default Home;
