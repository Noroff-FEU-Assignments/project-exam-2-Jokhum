import React, { useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
const ImageCarousel = ({ props }) => {
  const [current, setCurrent] = useState(0);
  const length = props.length;

  if (!Array.isArray(props) || length <= 0) {
    return null;
  }

  const nextImage = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevImage = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <>
      <div className="Details__Image__Carousel">
        <FiArrowLeft className="Arrow__Left" onClick={prevImage} />
        <FiArrowRight className="Arrow__Right" onClick={nextImage} />
        {props.map((image, index) => {
          return (
            <div className={index === current ? "Slide Active" : "Slide"} key={image.id}>
              {index === current && <img src={image.attributes.url} alt={image.attributes.alternativeText} className="Image" />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageCarousel;
