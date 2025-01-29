import React, { useEffect, useState } from "react";
import { useCart } from "react-use-cart";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Layout from "@/layout";
import { CheckBadgeIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import Moment from "react-moment";
import "moment/locale/fr";
import { Button } from "flowbite-react";
import { redirect } from "next/navigation";
import Head from "next/head";

const Remerciement = () => {
  const { emptyCart, setCartMetadata } = useCart();
  const [cartData, setCarData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    setCartMetadata({});
    emptyCart();
    if(router.isReady){
      let order = JSON.parse(router.query.data) || false;
      setCarData(order);
    }
     
    
  }, [router.isReady]);
  if (!cartData) {
    return <Layout></Layout>;
  }
  return (
    <Layout>
      <Head>
        <title>Merci pour votre commande!</title>
      </Head>
      <section className="text-center pt-12 pb-5 max-w-7xl mx-auto">
        <h1 className="text-center text-3xl mb-6">
          Merci pour votre commande!
        </h1>
        <CheckCircleIcon className="w-16 h-16 mx-auto text-green-600 mb-4" />

        <div className="flex justify-start item-start space-y-2 flex-col">
          <h1 className="text-md dark:text-white  font-semibold leading-7 lg:leading-9 text-gray-800">
            Commande #{cartData.id}
          </h1>
          <p className="text-base dark:text-gray-300 font-medium leading-6 text-gray-600">
            <Moment format="DD MMM YYYY - HH:MM">
              {cartData.date_created}
            </Moment>
          </p>
        </div>
        <Button
          className={
            "lg:w-fit mt-5 bg-rachel-red-700 hover:bg-rachel-red-800 duration-200 hover:!text-white mx-auto"
          }
          onClick={() => {
            router.push("/");
          }}
        >
          Retour à l'accueil
        </Button>
        <div className="pb-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
          <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
              <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Panier
                </p>
                {cartData.line_items.map((item) => (
                  <div
                    key={item.id}
                    className="mt-6 flex flex-row justify-start items-center space-x-6 xl:space-x-8 w-full"
                  >
                    <div className="pb-4 md:pb-8 w-full md:w-40">
                      <img
                        className="w-[100px] md:w-[250px]"
                        src={item?.image?.src || "/slider1.jpg"}
                        alt={item.name}
                      />
                    </div>
                    <div className="border-b border-gray-200 flex-row  flex justify-between  w-full pb-8  ">
                      <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                        {item.name}
                      </h3>

                      <div className="flex justify-between items-start w-full">
                        <p className="text-base dark:text-white xl:text-lg leading-6"></p>

                        <p className="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                          ${(+item.total + +item.total_tax).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center flex-col md:flex-row items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
                  <h3 className="text-left mb-4 text-xl dark:text-white font-semibold leading-5 text-gray-800">
                    Récapitulatif de la commande
                  </h3>
                  <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Sous-total:
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        $
                        {(
                          cartData.total -
                          cartData.total_tax -
                          cartData.shipping_total
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div className="flex justify-between items-center w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Livraison:
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        $
                        {cartData.shipping_total &&
                          (+cartData.shipping_total).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex justify-between w-full">
                      <p className="text-base dark:text-white leading-4 text-gray-800">
                        Taxes:
                      </p>
                      <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                        ${cartData.total_tax}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">
                      Total:
                    </p>
                    <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">
                      {(+cartData.total).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Client
              </h3>
              <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
                <div className="flex flex-col justify-start items-start flex-shrink-0">
                  <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                    <div className="flex justify-start items-start flex-col space-y-2">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center text-gray-800">
                        {cartData.billing.first_name}{" "}
                        {cartData.billing.last_name}
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M3 7L12 13L21 7"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p className="cursor-pointer text-sm leading-5 ">
                      {cartData.billing.email}{" "}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                  <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
                    <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
                      <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">
                        Adresse de livraison
                      </p>
                      <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                        {cartData.shipping.address_1}{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Remerciement), {
  ssr: false,
});
