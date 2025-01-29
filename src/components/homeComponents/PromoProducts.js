import { Card } from "flowbite-react";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function PromoProducts({ products }) {
  return (
    <section className="my-16">
      <div>
        <h2 className="font-semibold text-lg lg:text-2xl uppercase">
          Promotions
        </h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-5 grid-rows-1 gap-y-6 gap-x-3 lg:gap-x-4 pt-8 bg-red ">
        <Link
          className="group rounded border bg-white shadow-lg hover:shadow-xl transition duration-300"
          href="#"
        >
          <div
            className="rounded-t h-44 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/img/tires.jpg')` }}
          >
            <div className="duration-500 transition h-full bg-black bg-opacity-60 justify-center items-center opacity-0 flex group-hover:opacity-100">
              <span className="text-white font-semibold">En savoir plus</span>
            </div>
          </div>
          <div className="px-5 py-7">
            <h4 className="font-semibold text-xl">Promotion</h4>
            <p className="mt-4 text-gray-700 font-normal">
              Texte du promotion: Acheter x et recevoir 10% de réduction!
            </p>
          </div>
        </Link>
        <Link
          className="group rounded border bg-white shadow-lg hover:shadow-xl duration-300"
          href="#"
        >
          <div
            className="rounded-t h-44 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/img/brakes.jpg')` }}
          >
            <div className="duration-500 transition h-full bg-black bg-opacity-60 justify-center items-center opacity-0 flex group-hover:opacity-100">
              <span className="text-white font-semibold">En savoir plus</span>
            </div>
          </div>
          <div className="px-5 py-7">
            <h4 className="font-semibold text-xl">Promotion</h4>
            <p className="mt-4 text-gray-700 font-normal">
              Texte du promotion: Acheter x et recevoir 10% de réduction!
            </p>
          </div>
        </Link>
        <Link
          className="group rounded border bg-white shadow-lg hover:shadow-xl duration-300"
          href="#"
        >
          <div
            className="rounded-t h-44 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/img/rims.jpg')` }}
          >
            <div className="duration-500 transition h-full bg-black bg-opacity-60 justify-center items-center opacity-0 flex group-hover:opacity-100">
              <span className="text-white font-semibold">En savoir plus</span>
            </div>
          </div>
          <div className="px-5 py-7">
            <h4 className="font-semibold text-xl">Promotion</h4>
            <p className="mt-4 text-gray-700 font-normal">
              Texte du promotion: Acheter x et recevoir 10% de réduction!
            </p>
          </div>
        </Link>
        <Link
          className="group rounded border bg-white shadow-lg hover:shadow-xl duration-300"
          href="#"
        >
          <div
            className="rounded-t h-44 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/img/headlight.jpg')` }}
          >
            <div className="duration-500 transition h-full bg-black bg-opacity-60 justify-center items-center opacity-0 flex group-hover:opacity-100">
              <span className="text-white font-semibold">En savoir plus</span>
            </div>
          </div>
          <div className="px-5 py-7">
            <h4 className="font-semibold text-xl">Promotion</h4>
            <p className="mt-4 text-gray-700 font-normal">
              Texte du promotion: Acheter x et recevoir 10% de réduction!
            </p>
          </div>
        </Link>
        <Link
          className="group rounded border bg-white shadow-lg hover:shadow-xl duration-300"
          href="#"
        >
          <div
            className="rounded-t h-44 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/about.png')` }}
          >
            <div className="duration-500 transition h-full bg-black bg-opacity-60 justify-center items-center opacity-0 flex group-hover:opacity-100">
              <span className="text-white font-semibold">En savoir plus</span>
            </div>
          </div>
          <div className="px-5 py-7">
            <h4 className="font-semibold text-xl">Promotion</h4>
            <p className="mt-4 text-gray-700 font-normal">
              Texte du promotion: Acheter x et recevoir 10% de réduction!
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
