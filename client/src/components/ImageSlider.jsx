import React, { useState } from "react";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { formatCurrency } from "../utils/formatCurrency";
import { Image, Button } from "react-bootstrap";

const ImageSlider = ({ casualPicks }) => {
  const [current, setCurrent] = useState(0);
  console.log("casual", casualPicks);
  const length = casualPicks.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(casualPicks) || casualPicks.length <= 0) {
    return null;
  }
  return (
    <div className="d-flex justify-content-center align-items-center mx-auto border border-danger img-contain mt-3">
      <BsArrowLeft className="left-arrow both-arrow" onClick={prevSlide} />
      <BsArrowRight className="right-arrow both-arrow" onClick={nextSlide} />
      {casualPicks.map((picks, index) => (
        <div key={index}>
          {index === current && (
            <div className="d-lg-flex align-items-center flex-row-reverse">
              <Link to={`/product/${picks.slug}`}>
                <div className="resizeA">
                  <Image
                    src={picks.images[0]}
                    alt={picks.title}
                    className="img-fluid mb-4 p-2"
                  />
                </div>
              </Link>
              <div className="px-2 mb-4 resize">
                <div className="text-danger fs-5 mt-4 mt-lg-0">
                  <p className="mb-0">{picks.title}</p>
                  <p className="small fw-light">{picks.brand}</p>
                </div>
                <p className="text-danger fs-5 mt-4 mt-lg-0">
                  {formatCurrency(picks.price)}
                </p>
                <Link to={`/product/${picks.slug}`}>
                  <Button
                    className="w-100 rounded-0"
                    size="lg"
                    variant="danger"
                  >VIEW PRODUCT</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
