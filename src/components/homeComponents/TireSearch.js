import Script from "next/script";
import React, { useEffect } from "react";
import 'aos/dist/aos.css'
import Aos from "aos";

export default function TireSearch() {
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <div>
      <Script
        src="https://app.tireconnect.ca/js/widget.js"
        strategy="lazyOnload"
        onReady={() => {
          TCWidget.initForm({
            apikey: "8cdb18299dcd865d3d8c20f9320a2a41",
            layout: "vertical",
            locationDetect: "auto",
            view: "compact",
            container: "tireconnect",
            redirectUrl: "/recherche-pneu/",
            locationLock: true,
            locale: "fr_CA",
          });
        }}
      />
      <section
        className="flex flex-col items-center w-full py-16 border-t rounded px-11 bg-center md:bg-right-bottom bg-cover bg-no-repeat my-24"
        style={{ backgroundImage: `url('/slider2.jpg')` }}
        data-aos="fade-out" data-aos-duration="2000"
      >
        <h3
          style={{ textShadow: "1px 1px 5px black" }}
          className="uppercase text-white text-2xl lg:text-4xl font-bold mb-4"
        >
          {"Trouvez Les Bons Pneus Pour Votre Véhicule"}
        </h3>
        <p
          className="mb-10 text-white "
          style={{ textShadow: "1px 1px 5px black" }}
        >
          {
            "Donnez-nous un peu plus d'informations et nous vous montrerons des pneus adaptés à votre véhicule."
          }
        </p>

        <div style={{ textShadow: "1px 1px 5px white" }} id="tireconnect" className="max-w-[1000px] block min-w-[300px]"></div>
        <p className="mt-10 text-black bg-white p-2 leading-5 bg-opacity-60 rounded font-medium max-w-4xl text-xs text-center ">{`Une taxe de 4,50$ est requise sur les pneus neufs d'automobiles au Québec pour financer la récupération et le recyclage des pneus usagés. Pour les pneus neufs de camions, cette taxe est de 6$.`}</p>
      </section>
    </div>
  );
}
