import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from "../Button";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { env } from "process";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
      onClick={onClick}
    >
      <span className="text-rachel-red-700 text-sm -left-14 absolute">
        Suivant{" "}
      </span>
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "transparent",
      }}
      onClick={onClick}
    >
      <span className="text-rachel-red-700 text-sm left-7 absolute">
        Precédent
      </span>
    </div>
  );
}

export default function SimpleSlider() {
  const { data, status } = useSession();

  useEffect(() => {
    Aos.init();
  }, []);

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
    }
  }, [status]);
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    appendDots: (dots) => (
      <div
        style={{
          backgroundColor: "transparent",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <ul className="left-0 absolute -top-5 "> {dots} </ul>
      </div>
    ),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const sliders = [
    {
      headline:
        "Votre expert en accessoires auto, pneus et roues de qualité au Canada",
      image: "img/main-slider.webp",
      paragraph:
        "Des produits haut de gamme pour améliorer la performance et le style de votre véhicule.",
      link: "boutique",
    },
    {
      headline: "Pneus de qualité supérieure: roulez en toute confiance.",
      image: "img/tires.jpg",
      paragraph:
        "Découvrez notre gamme de pneus fiables pour une conduite sûre et confortable.",
      link: "/recherche-pneu/",
    },
    {
      headline:
        "Sécurité en route : Attelages de remorque pour vos voyages en voiture.",
      image: "trailer.jpg",
      paragraph:
        "Voyagez en Toute Confiance avec Nos Attelages de Remorque Fiables et Sûrs, Conçus pour S'adapter Parfaitement à Votre Voiture.",
      link: "boutique/?categorie_id=29659",
    },
    {
      headline:
        "Aventure à deux roues : Attelages pour vélos adaptés à votre voiture.",
      image: "slider6.jpg",
      paragraph:
        "Emportez Vos Deux Roues Partout où Vous Allez grâce à Nos Attelages pour Vélos, Spécialement Conçus pour S'adapter à Votre Voiture et à Votre Mode de Vie Actif.",
      link: "boutique/?categorie_id=29681",
    },
  ];
  return (
    <section data-aos="fade-in" data-aos-duration="800" className="w-full">
      <Slider {...settings} className="bg-white pb-4 mb-14 main-slider -mt-5">
        {sliders.map((slider, index) => (
          <div
            key={index}
            className={`w-full  h-[500px] lg:h-[650px] bg-red-400 !flex justify-center items-center `}
          >
            <div
              className={`p4-4 w-full flex-wrap flex flex-col z-20 justify-${
                index === 0 ? "center bg-black  p-0" : "center  md:px-16"
              } items-center h-full bg-bottom bg-cover  bg-no-repeat  `}
              {...(index > 0
                ? { style: { backgroundImage: `url(${slider.image})` } }
                : {})}
            >
              {/* /* ------------------------------- first slide ------------------------------ */}
              {index === 0 ? (
                <div
                  className={`p-0  w-full flex flex-col z-20 !items-center !justify-start h-full  relative`}
                >
                  <Image
                  unoptimized
                    alt="Mountains"
                    src="/img/sliders/slider1_img1.png"
                    blurDataURL="/img/sliders/slider1_img1.png"
                    placeholder="blur"
                    quality={100}
                    width={1500}
                    height={700}
                    data-aos="fade-in"
                    data-aos-duration="800"
                    className="absolute -z-[10] !left-0 !right-0 mx-auto top-0 w-full h-full object-cover"
                  />
                  <Image
                  unoptimized
                    alt="Mountains"
                    src="/img/sliders/slider1_img2.png"
                    blurDataURL="/img/sliders/slider1_img2.png"
                    placeholder="blur"
                    quality={100}
                    width={400}
                    height={400}
                    data-aos-delay="500"
                    data-aos="fade-right"
                    data-aos-duration="1500"
                    className="absolute -z-[9] !left-0 top-0 object-left-bottom w-full object-cover md:object-contain lg:w-[60%] h-full lg:object-cover"
                  />
                  <Image
                  unoptimized
                    alt="Mountains"
                    src="/img/sliders/slider1_img3.png"
                    blurDataURL="/img/sliders/slider1_img3.png"
                    placeholder="blur"
                    quality={100}
                    width={400}
                    height={400}
                    data-aos-delay="1000"
                    data-aos="fade-left"
                    data-aos-duration="1500"
                    className="absolute -z-[8] ml-auto !right-0 w-11/12 md:w-2/3 h-full xl:w-full object-cover xl:object-contain object-left xl:object-right "
                  />
                  <div className="container mx-auto">
                    <h1
                      className="text-center  p-2 lg:px-8  w-full  lg:py-3 text-4xl xl:text-5xl lg:mt-24 font-extrabold text-white  max-w-5xl mx-auto !leading-snug mt-16"
                      style={{ textShadow: "2px 2px 10px black" }}
                      data-aos="fade-right"
                      data-aos-duration="1500"
                      data-aos-delay="1500"
                      dangerouslySetInnerHTML={{ __html: slider.headline }}
                    />

                    <p
                      {...(index === 0
                        ? {
                            "data-aos": "fade-right",
                            "data-aos-duration": "1500",
                            "data-aos-delay": "2000",
                          }
                        : "")}
                      className={`w-full xl:text-5xl lg:mt-4  !text-lg  text-white rounded-xl lg:rounded-full p-2 lg:px-8 lg:py-3 mx-auto mt-2 text-center`}
                      style={{ textShadow: "3px 3px 7px black" }}
                    >
                      {slider.paragraph}
                    </p>
                    <Link
                      data-aos="fade-in"
                      data-aos-duration="1500"
                      data-aos-delay="2500"
                      className="flex items-center bg-rachel-red-700 text-white xl:px-3 mx-auto rounded-md w-fit mt-10 font-bold !text-base !px-6 !py-2 "
                      href={slider.link || "/boutique"}
                    >
                      Magasiner
                    </Link>
                  </div>
                </div>
              ) : (
                <span
                  className=" text-2xl lg:text-4xl flex justify-center text-center font-extrabold text-white max-w-5xl"
                  style={{ textShadow: "2px 2px 10px black" }}
                >
                  {slider.headline}
                </span>
              )}

              {/* ------------------------------ other slides ------------------------------  */}
              {index > 0 && (
                <>
                  <p
                    className={`bg-black  w-fit !text-lg  text-white mt-0  max-w-2xl mx-auto text-center ${
                      index === 0
                        ? "rounded-xl lg:rounded-full p-2 lg:px-8 lg:py-3 "
                        : "px-8 py-3 bg-opacity-30 mt-8 rounded-full"
                    }`}
                    style={{ textShadow: "3px 3px 7px black" }}
                  >
                    {slider.paragraph}
                  </p>
                  <Link
                    className="flex items-center  bg-rachel-red-700 text-white xl:px-3 ml-2  rounded-md w-fit mt-5 font-bold !text-base !px-6 !py-2 !mx-auto"
                    href={slider.link || "/boutique"}
                  >
                    Magasiner
                  </Link>
                </>
              )}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
