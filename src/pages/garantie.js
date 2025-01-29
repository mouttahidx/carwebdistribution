import Layout from "@/layout";
import Head from "next/head";
import React from "react";

export default function Garantie() {
  return (
    <>
      <Head>
        <title key={"Garantie"}>{`${
          "Garantie - " + process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      <Layout>
        <div className="py-16 px-5 max-w-7xl mx-auto">
          <h1 className="text-4xl text-center font-semibold mb-8 ">Garantie</h1>
          <p className="text-center font-bold mb-10">
            Les garanties sont celles des manufacturiers et vous devez voir avec
            le manufacturier
          </p>
          <p>
            Nous, Car Web Distribution, nous engageons à respecter les
            garanties de chaque fabricant dont les produits sont présentés sur
            notre site Web, conformément aux termes et conditions énoncés par
            ces fabricants. Nous garantissons que tous les produits que nous
            vendons sont couverts par les garanties spécifiques fournies par les
            fabricants respectifs.
            <br />
            <br />
            En tant qu'intermédiaire de vente, nous nous efforçons de faciliter
            le processus de garantie pour nos clients. Si un produit acheté sur
            notre site Web présente un défaut couvert par la garantie du
            fabricant, nous travaillerons en étroite collaboration avec vous
            pour vous guider dans les démarches nécessaires pour faire valoir
            cette garantie. Cela peut inclure la fourniture de documents, la
            communication avec le fabricant ou la facilitation de l'envoi du
            produit au centre de service du fabricant, selon les exigences
            spécifiques de la garantie.
            <br />
            <br />
            Veuillez noter que chaque fabricant peut avoir des conditions de
            garantie différentes, notamment des durées de garantie, des
            exclusions de garantie et des procédures de réclamation spécifiques.
            Il est de votre responsabilité en tant que client de lire
            attentivement les termes de garantie du fabricant fournis avec le
            produit et de les respecter.
            <br />
            <br />
            Nous nous engageons à fournir toutes les informations nécessaires
            pour que vous puissiez exercer votre droit à la garantie de manière
            efficace et sans tracas. Si vous avez des questions ou des
            préoccupations concernant une garantie spécifique, n'hésitez pas à
            nous contacter à <b>info@carwebdistribution.ca</b> ou <b>+1 514-883-0691</b>.
            <br />
            <br /> Nous sommes là pour vous aider à obtenir satisfaction.
            <br />
            <br />
            Cette déclaration de garantie est valable à partir de la date
            d'achat du produit sur notre site Web et reste en vigueur jusqu'à
            l'expiration de la garantie du fabricant, conformément à leurs
            conditions.
          </p>

          <p className="font-bold mt-10">Car Web Distribution</p>
          <p className=" mt-4">
            858 chemin du rivage St jean sur Richelieu QC , j0L1 R0
          </p>
          <p className=" mt-4">carwebdistribution.ca</p>
          <p className=" mt-4">info@carwebdistribution.ca</p>
          <p className=" mt-4">
            +1 514-883-0691
            <br />
            +1 800-883-0691
          </p>
        </div>
      </Layout>
    </>
  );
}
