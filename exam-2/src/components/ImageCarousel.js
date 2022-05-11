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
      <div className="details__image__carousel">
        <FiArrowLeft className="arrow__left" onClick={prevImage} />
        <FiArrowRight className="arrow__right" onClick={nextImage} />
        {props.map((image, index) => {
          return (
            <div className={index === current ? "slide active" : "slide"} key={image.id}>
              {index === current && <img src={image.attributes.url} alt={image.attributes.alternativeText} className="image" />}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ImageCarousel;
