import { useState, useEffect } from "react";

const images = [
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/44fe68e438b997c9.jpeg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/b229a95edd3af8bd.jpg?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/d9290fb51138d286.png?q=20",
  "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/20a160ef30776af8.jpeg?q=20"
];

const ImgSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  useEffect(() => {
    const timer = setInterval(goToNext, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[50vh] md:h-[40vh] lg:h-[40vh] overflow-hidden mx-auto my-4 md:my-6 lg:my-8 rounded-lg shadow-lg">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-full object-cover rounded-lg"
      />
      <button
        onClick={goToPrevious}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 md:p-4 rounded-full hover:bg-opacity-100 transition-opacity duration-300 z-10"
      >
        ❮
      </button>
      <button
        onClick={goToNext}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 bg-gray-800 bg-opacity-75 text-white p-2 md:p-4 rounded-full hover:bg-opacity-100 transition-opacity duration-300 z-10"
      >
        ❯
      </button>
    </div>
  );
};

export default ImgSlider;
