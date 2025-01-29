import Button from "@/components/Button";
import Benefits from "@/components/homeComponents/Benefits";
import Footer from "@/layout/Footer";
import Header from "@/layout/header/Header";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export default function Apropos() {
  const router = useRouter();
  return (
    <>
    <Head>
        <title key={"À propos"}>{`${
          "À propos - " + process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      <Header />
      <section className="bg-rachel-black-950 flex justify-center">
        <div className="py-16 px-2 grid md:grid-cols-2 gap-y-12 items-center max-w-7xl">
          <div className="px-5 md:px-8 lg:px-20">
            <h1 className="lg:text-4xl text-4xl mb-2 font-bold text-white">
              Car Web Distribution
            </h1>
            <h2 className="text-white text-sm my-10">
              {
                "Découvrez notre sélection en ligne de pièces et roues de qualité pour votre voiture. Livraison rapide assurée. Trouvez tout ce qu'il vous faut pour entretenir ou personnaliser votre véhicule dès maintenant !"
              }
            </h2>
            <div className="flex mt-6 w-full ">
              <Button
                text={"Magasiner"}
                className="mr-4"
                onClick={() => {
                  router.push("/boutique");
                }}
              />
              <Button
                text={"Ajouter votre véhicule"}
                className="bg-white !text-rachel-red-700"
                onClick={() => {
                  router.push("/compte/vehicules/");
                }}
              />
            </div>
          </div>
          <div>
            <Image
              src={"/about.png"}
              width="500"
              height="500"
              className="w-[500px] -mb-24"
              alt="toolbox mecanic"
            />
          </div>
        </div>
      </section>
      <section className="py-16 px-5 md:px-8 lg:px-20">
        <h2 className="lg:text-4xl text-3xl mb-2 font-bold capitalize">
          4 avantages principaux
        </h2>
        <h3 className=" text-sm mt-6 max-w-[450px]">
          {
            "Qualité, variété, et livraison rapide sont au rendez-vous. Trouvez dès maintenant ce qu'il vous faut pour entretenir ou personnaliser votre véhicule !"
          }
        </h3>

        <Benefits/>
      </section>
      <Footer />
    </>
  );
}
