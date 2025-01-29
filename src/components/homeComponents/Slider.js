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
      headline: "Partez à l'aventure <br/>en toute tranquilité!",
      image: "img/main-slider.webp",
      paragraph:
        "Découvrez nos accessoires pour VR automobiles et camionettes.",
      link: "boutique/?categorie_id=29644,29656,29642,29640,29666,29637,29648",
    },
    {
      headline:
        "Ajoutez votre voiture pour des résultats de recherche de roues personnalisés.",
      image: "/img/sliders/add_car.jpg",
      paragraph:
        "Saisissez les détails de votre voiture pour recevoir des recommandations personnalisées de roues. Profitez d'une expérience de recherche sur mesure pour un ajustement et un style parfaits.",
      link: status !== "authenticated" ? "/#select_vehicle" : "/compte/vehicules/" ,
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
      <Slider {...settings} className="bg-white pb-4 mb-14 main-slider">
        {sliders.map((slider, index) => (
          <div
            key={index}
            className={`w-full  h-[500px] lg:h-[650px] bg-red-400 !flex justify-center items-center `}
          >
            <div
              className={`p4-4 w-full flex-wrap flex flex-col z-20 justify-${
                index === 0 ? "start bg-black  p-0" : "center  md:px-16"
              } items-center h-full bg-bottom bg-cover  bg-no-repeat  `}
              {...(index > 0
                ? { style: { backgroundImage: `url(${slider.image})` } }
                : {})}
            >
              {/* /* ------------------------------- first slide ------------------------------ */}
              {index === 0 ? (
                <div
                  className={`p-0  w-full flex flex-col z-20 !items-start !justify-start h-full  relative`}
                >
                  <Image
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
                  <h1
                    className="text-left  p-2 lg:px-8  w-full  lg:py-3 text-4xl xl:text-5xl lg:mt-24  xl:w-1/2 2xl:w-1/2 font-extrabold text-white  max-w-7xl !leading-snug ml-4 mt-16"
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
                    className={`w-full md:w-1/3 xl:text-5xl lg:mt-4  xl:w-1/3 2xl:1/4 !text-lg  text-white  max-w-2xl rounded-xl lg:rounded-full p-2 lg:px-8 lg:py-3 ml-4 mt-2`}
                    style={{ textShadow: "3px 3px 7px black" }}
                  >
                    {slider.paragraph}
                  </p>
                  <Link
                    target="_blank"
                    data-aos="fade-in"
                    data-aos-duration="1500"
                    data-aos-delay="2500"
                    className="flex items-center bg-rachel-red-700 text-white xl:px-3 ml-6 lg:ml-12 rounded-md w-fit mt-10 font-bold !text-base !px-6 !py-2 "
                    href={slider.link || "/boutique"}
                  >
                    Magasiner
                  </Link>
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
                    className={`bg-black    w-fit !text-lg  text-white mt-0  max-w-2xl mx-auto ${
                      index === 0
                        ? "rounded-xl lg:rounded-full p-2 lg:px-8 lg:py-3 "
                        : "px-8 py-3 bg-opacity-30 mt-8 rounded-full"
                    }`}
                    style={{ textShadow: "3px 3px 7px black" }}
                  >
                    {slider.paragraph}
                  </p>
                  <Link
                    {...(index !== 1 && {"target" : "_blank"})}
                    className="flex items-center  bg-rachel-red-700 text-white xl:px-3 ml-2  rounded-md w-fit mt-5 font-bold !text-base !px-6 !py-2 !mx-auto"
                    href={slider.link || "/boutique"}
                  >
                    {index !== 1 ? "Magasiner" : "Ajouter un véhicule"}
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
