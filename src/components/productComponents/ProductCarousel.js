import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function ProductCarousel({ data }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [slider1, setSlider1] = useState(null);
  const [slider2, setSlider2] = useState(null);

  useEffect(() => {
    setNav1(slider1);
    setNav2(slider2);
  });

  const settingsMain = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    fade: true,
    asNavFor: ".slider-nav",

  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".slider-for",
    arrows: true,
    centerPadding:0,
    centerMode: true,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "20px",

  };

  return (
    <div>
      <Slider
        {...settingsMain}
        asNavFor={nav2}
        ref={(slider) => setSlider1(slider)}
        className="product-slider"
      >
        {data.map((slide) => (
          <div className="relative overflow-hidden h-96" key={slide.id}>
            <Image
              className="object-cover  w-full rounded-t-md"
              alt={slide?.name}
              fill
              src={`${slide.src}`}
              unoptimized
            />
          </div>
        ))}
      </Slider>

      <Slider
        {...settingsThumbs}
        asNavFor={nav1}
        ref={(slider) => setSlider2(slider)}
        className="mt-10 rounded-b-md thumbnails"
      >
        {data.map((slide) => (
          <div
            className="relative overflow-hidden h-36 rounded-b-md w-full"
            key={slide.id}
          >
            <Image
              className="object-cover rounded-b-md w-full border"
              alt={slide?.name}
              fill
              src={`${slide.src}`}
              unoptimized
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
