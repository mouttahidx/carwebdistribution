import Layout from "@/layout";
import { Button, Card } from "flowbite-react";
import Head from "next/head";
import Image from "next/image";
import React from "react";

export default function Rabaispostaux() {
  const promos = [
    {
      title: "BRIDGESTONE - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-05-19 ou jusqu'à épuisement	",
      image: "promo1.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_463_3084_.pdf?v=E426E133F51A5EF410E18557084CA6B6",
    },
    {
      title: "GOODYEAR- RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-06-30 ou jusqu'à épuisement",
      image: "promo2.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_464_3084_.pdf?v=386F6E4A074B7E002395AE66E1279CD8",
    },
    {
      title: "PIRELLI - RABAIS PRINTEMPS 2024",
      text: "Recevez jusqu'à 100 dollars de remise ou 120 dollars CAA à l'achat de 4 pneus sélectionnés.",
      dates: "Du 2024-03-01 au 2024-05-31",
      image: "promo3.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_465_3084_.pdf?v=2BE8AB18204C9465A5B9CEBC7DAED7C1",
    },
    {
      title: "TOYOTIRES - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-16 au 2024-05-31",
      image: "promo4.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_466_3084_.pdf?v=A79BA4ABB84874E9CF29A892CDA4F32E",
    },
    {
      title: "MICHELIN - RABAIS PRINTEMPS 2024",
      text: "À l'achat d'un jeu de 4 pneus sélectionnés, obtenez jusqu'à 100 dollars de remise",
      dates: "Du 2024-03-18 au 2024-05-31",
      image: "promo5.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_467_3084_.pdf?v=632901993205F14E84DD6E388F6BF3DF",
    },
    {
      title: "YOKOHAMA - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-15 au 2024-05-31",
      image: "promo6.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_468_3084_.pdf?v=6CDAA99BAA0AE9EED62C31EA7269ECC6",
    },
    {
      title: "CONTINENTAL - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-05-31 ou jusqu'à épuisement",
      image: "promo7.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_469_3084_.pdf?v=DFE9D7162DC5CCE270A8529471C88D25",
    },
    {
      title: "BFGOODRICH - RABAIS PRINTEMPS 2024",
      text: "À l'achat d'un jeu de 4 pneus sélectionnés, obtenez jusqu'à 90 dollars de remise.",
      dates: "Du 2024-03-18 au 2024-05-31",
      image: "promo8.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_470_3084_.pdf?v=032F92EF92D4D12FB30D6158571D99C8",
    },
    {
      title: "FIRESTONE - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 90 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-05-19",
      image: "promo9.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_471_3084_.pdf?v=6EBC1A2B9A8B9744C8C079C9FAD4DA23",
    },
    {
      title: "COOPERTIRES - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 75 dollars sur une carte prépayée.",
      dates: "Du 2024-04-01 au 2024-05-31",
      image: "promo10.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_472_3084_.pdf?v=95A6E5A0CA0B251F559411269D3564B6",
    },
    {
      title: "HANKOOK - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 100 dollars sur une carte prépayée.",
      dates: "Du 2024-03-15 au 2024-06-15",
      image: "promo11.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_473_3084_.pdf?v=415A0F82741B8FFB6291D31FA9647677",
    },
    {
      title: "NITTO - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 70 dollars sur une carte prépayée.",
      dates: "Du 2024-03-16 au 2024-06-30",
      image: "promo12.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_474_3084_.pdf?v=EA02ADFBA73008C113E7D3A959696E26",
    },
    {
      title: "KUMHO TYRES - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez 80 dollars sur une carte prépayée.",
      dates: "Du 2024-03-18 au 2024-06-15",
      image: "promo13.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_475_3084_.pdf?v=F183D99AEF85DFFAE38EA4D344C6570C",
    },
    {
      title: "FALKEN - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez jusqu'à 80 dollars sur une carte prépayée.",
      dates: "Du 2024-03-15 au 2024-05-31",
      image: "promo14.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_476_3084_.pdf?v=68ABB85C7005AC0FB4EAD88502C54F8E",
    },
    {
      title: "UNIROYAL - RABAIS PRINTEMPS 2024",
      text: "À l'achat d'un jeu de 4 pneus Uniroyal , obtenez 50 dollars de remise.",
      dates: "Du 2024-03-18 au 2024-05-31",
      image: "promo15.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_477_3084_.pdf?v=DE20CAE929B656D815983B465CD172E4",
    },
    {
      title: "NEXEN - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez 60 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-06-15",
      image: "promo16.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_478_3084_.pdf?v=AE73A1A9B1457E4EEC45C8EFE191910E",
    },
    {
      title: "LAUFENN - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez 40 dollars sur une carte prépayée.",
      dates: "Du 2024-03-15 au 2024-06-15",
      image: "promo17.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_479_3084_.pdf?v=FB8BF4F5D55723695FB7DF9325F5C592",
    },
    {
      title: "GENERAL TIRE - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez 70 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-05-31",
      image: "promo18.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_480_3084_.pdf?v=6375E973292F6BC1C61460C9E1A422E3",
    },
    {
      title: "NOKIAN - RABAIS PRINTEMPS 2024",
      text: "À l'achat de 4 pneus sélectionnés, recevez 80 dollars sur une carte prépayée.",
      dates: "Du 2024-03-11 au 2024-06-21",
      image: "promo19.png",
      link: "https://b2b.distributionstox.ca/Content/Promotions/coupon_481_3084_.pdf?v=62FC03DC1E765E970C78480ABE66D2A1",
    },
  ];
  return (
    <>
      <Head>
        <title key={"Promotions"}>{`${
          "Promotions - " + process.env.NEXT_PUBLIC_WEBSITE_TITLE ||
          "Check .ENV"
        }`}</title>
      </Head>
      <Layout>
        <h1 className="mt-14 text-center text-4xl font-semibold">
          Rabais postaux
        </h1>
        <div className="h-1.5 w-24 bg-rachel-red-700 mx-auto rounded-full mt-2 mb-16 " />
        <div className="gap-3 2xl:gap-8 py-16 px-5 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
          {promos.map((promo, index) => (
            <Card
              key={index}
              className="w-full [&>div]:px-3"
              imgSrc={"/img/promos/" + promo.image}
              imgAlt={promo.title}
            >
              <span className="text-xs h-6">{promo.dates}</span>
              <h5 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                {promo.title}
              </h5>
              <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {promo.text}
              </p>
                <a
                  href={promo.link}
                  className="flex items-center bg-rachel-red-700 hover:!bg-rachel-red-800 mt-auto text-white py-1 rounded-md  justify-center"
                >
                  Voir le PDF
                  <svg
                    className="-mr-1 ml-2 h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
            </Card>
          ))}
        </div>
      </Layout>
    </>
  );
}
