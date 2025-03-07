import React, { useEffect } from "react";
import Button from "../Button";
import { useRouter } from "next/router";
import Aos from "aos";
import "aos/dist/aos.css";
export default function Tiles() {
  useEffect(() => {
    Aos.init();
  }, []);
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4  gap-4 w-full mb-28">
      {/* first */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        style={{ backgroundImage: `url('/img/tires.jpg')` }}
        className="col-span-1 col-end-2 flex-col bg-no-repeat bg-cover bg-center rounded "
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white font-medium text-center md:text-xl lg:text-2xl max-w-[200px] mb-6"
          >
            {"Achetez vos Pneus en Toute Simplicité"}
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              window.location.href = "/recherche-pneu/";
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>

      {/* biggest */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="300"
        style={{ backgroundImage: `url('/img/rv.jpg')` }}
        className="md:col-start-2 col-span-2  md:row-start-1 flex-col bg-no-repeat bg-cover bg-center rounded "
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded shadow-md">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white text-center md:text-2xl lg:text-3xl 2xl:text-4xl mb-6 uppercase px-10 !leading-relaxed"
          >
            Accessoires VR et <br></br>
            <b>roulottes</b>
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              router.push(
                "/boutique/?categorie_id=51512"
              );
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>

      {/* second biggest */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1200"
        style={{ backgroundImage: `url('/img/luggage.jpg')` }}
        className="md:col-start-2 col-span-2  md:row-start-2 flex-col bg-no-repeat bg-cover bg-center rounded "
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded shadow-md">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white text-center md:text-2xl lg:text-3xl 2xl:text-4xl mb-6 uppercase px-10 !leading-relaxed"
          >
            Attache de remorque et
            <br></br>
            <b>porte bagage</b>
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              router.push("/boutique/?categorie_id=51509");
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>

      {/* 4 */}

      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="600"
        style={{ backgroundImage: `url('/img/rims.jpg')` }}
        className="col-start-2 row-start-1 col-end-3 md:row-start-1 md:col-start-4 md:col-end-5 col-span-1 flex-col bg-no-repeat bg-cover rounded bg-right"
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white font-medium text-center md:text-xl lg:text-2xl max-w-[200px] mb-6"
          >
            {"Trouvez Vos Jantes Idéales en Quelques Clics"}
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              router.push("/boutique/?categorie_id=29345");
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>

      {/* second */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="900"
        style={{ backgroundImage: `url('/img/velo.webp')` }}
        className="md:row-start-2 col-start-1 flex-col bg-no-repeat bg-cover bg-center rounded "
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white font-medium text-center md:text-xl lg:text-2xl max-w-[200px] mb-6"
          >
            {"Vélos Electriques (MAUI)"}
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              router.push("/boutique/?categorie_id=50410&marque=29992");
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>

      {/* 5 */}
      <div
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="1500"
        style={{ backgroundImage: `url('/img/interior.jpg')` }}
        className="md:col-start-4 md:row-start-2 flex-col bg-no-repeat bg-cover bg-center rounded "
      >
        <div className="bg-opacity-20 bg-black w-full h-full py-10 xl:py-16 flex flex-col justify-end items-center rounded">
          <h4
            style={{ textShadow: "1px 1px 10px black" }}
            className="text-white font-medium text-center md:text-xl lg:text-2xl max-w-[200px] mb-6"
          >
            {"Rénovez l'Intérieur de Votre Voiture avec Style"}
          </h4>
          <Button
            text={"Magasiner"}
            onClick={() => {
              router.push("/boutique/?categorie_id=51499");
            }}
            className="tracking-wide !px-4"
            icon={false}
          />
        </div>
      </div>
    </div>
  );
}
