import Link from "next/link";
import { useRouter } from "next/router";
import "aos/dist/aos.css";
import Aos from "aos";
import { useEffect } from "react";

export default function TiresBrands() {
  const brands = [
    "/img/bridgestone.jpg",
    "/img/bfgoodrich.jpg",
    "/img/goodyear.png",
    "/img/michelin.webp",
    "/img/pireli.png",
    "/img/sailun.webp",
    "/img/yokohama.jpg",
    "/img/continental.png",
    "/img/hankook.png",
    "/img/dunlop.png",
    "/img/falken.png",
    "/img/firestone.png",
    "/img/kelly-tires.png",
    "/img/Kumho-tires.png",
    "/img/nexen.png",
    "/img/toyo.png",
    "/img/lauffenn.png",
    "/img/uniroyal.png",
    "/img/coopertires.png",
    "/img/nitto.png",
    "/img/gt-raddial.png",
    "/img/nokian.png",
  ];

  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="my-24 text-center">
      <div className="flex justify-between mb-8">
        <h2 className="font-semibold text-lg lg:text-2xl uppercase">
          Nos Pneus
        </h2>
      </div>
      <div className="content-start grid grid-cols-3 md:grid-cols-6  grid-rows-1 gap-2 py-8 bg-red gap-y-4 mb-12">
        {brands &&
          brands?.length > 0 &&
          brands?.map((brand, index) => (
            <Link
              href={"/recherche-pneu"}
              key={index}
              className="flex flex-col justify-start rounded-md items-center py-10 bg-center bg-contain  h-[100px] hover:shadow-2xl bg-no-repeat shadow-black duration-500 border"
              style={{ backgroundImage: `url('${brand}')` }}
              data-aos="fade-up"
              data-aos-duration="500"
              data-aos-delay={index * 100}
            />
          ))}
      </div>
      <Link
       data-aos="fade-up"
       data-aos-duration="1000"
       data-aos-delay={2500}
        href="/rabais_postaux"
        className="bg-rachel-red-700 hover:!bg-rachel-red-800 mx-auto text-center py-2 px-4 rounded-md text-white mt-16"
      >
        Voir les rabais
      </Link>
    </section>
  );
}
