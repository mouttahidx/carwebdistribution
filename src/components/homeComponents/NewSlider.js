import Image from "next/image";
import React from "react";
import Link from "next/link";

export default function NewSlider() {
  const sliders = [
    {
      headline:
        "Votre expert en accessoires auto, pneus et roues de qualité au Canada",
      paragraph:
        "Des produits haut de gamme pour améliorer la performance et le style de votre véhicule.",
      link: "boutique",
    },
  ];

  return (
    <section className="bg-no-repeat bg-cover min-h-[500px] lg:min-h-[600px] relative -mt-5">
      <div className="absolute z-[9] w-full h-full">
        <Image
          src="/img/sliders/cwd-slider.webp"
          fill
          quality={100}
          className="w-full h-screen object-cover"
          alt="Voiture camionette Car web distribution"
          priority={true}
        />
      </div>

      <div className="w-full lg:px-10 px-2 h-[500px] lg:h-[600px] z-10 bg-black bg-opacity-25 rounded py-32 relative">
        <div className="flex flex-col justify-center h-full ">
          <h1
            className="text-center  p-2 lg:px-8  w-full  lg:pb-3 text-3xl xl:text-5xl font-extrabold text-white  max-w-5xl mx-auto leading-snug"
            style={{ textShadow: "2px 2px 10px black" }}
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="1500"
          >
            {sliders[0].headline}
          </h1>
          <h2
            className={`w-full xl:text-5xl lg:mt-4  !text-lg  text-white rounded-xl lg:rounded-full p-2 lg:px-8 lg:py-3 mx-auto mt-2 text-center`}
            style={{ textShadow: "3px 3px 7px black" }}
            data-aos-duration="1500"
            data-aos-delay="2000"
            data-aos="fade-right"
          >
            {sliders[0].paragraph}
          </h2>
          <Link
            data-aos="fade-right"
            data-aos-duration="1500"
            data-aos-delay="2000"
            className="flex items-center bg-rachel-red-700 text-white xl:px-3 mx-auto rounded-md w-fit my-10 font-bold text-base px-6 py-2 "
            href={"/boutique"}
          >
            Magasiner
          </Link>
        </div>
      </div>
    </section>
  );
}
