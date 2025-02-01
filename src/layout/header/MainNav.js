"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/components/shopComponents/Cart"), {
  ssr: false,
});

import { BuildingStorefrontIcon } from "@heroicons/react/24/outline";
import AccountMenuItem from "@/components/accountComponents/AccountMenuItem";
import NavSelectVehicle from "@/components/homeComponents/NavSelectVehicle";
import AlgoliaSearch from "@/components/AlgoliaSearch";

export default function MainNav() {
  return (
    <div className="hidden lg:container mx-auto w-full lg:flex items-center border-b justify-between py-2 gap-4 xl:gap-x-6 px-2 md:flex-nowrap flex-wrap relative">
      {/* Logo */}
      <div className="w-[100px] ">
        <Link href="/" className="flex flex-col items-start justify-start">
          <Image
            src="/logo-dark.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full max-w-[90px] lg:max-w-[100px] h-auto object-contain"
            alt="Car web distribution logo"
            priority="false"
            unoptimized
          />
          <p className="text-xs font-semibold text-center hidden md:block">
            carwebdistribution
          </p>
        </Link>
      </div>
      {/* search */}
      <div className="w-8/12 pr-2 md:w-7/12 lg:w-5/12 flex items-center">
        {/* <Search /> */}
        <AlgoliaSearch />
      </div>

      {/* Select Vehicle */}
      <div className="hidden lg:flex max-w-[300px] ">
        <NavSelectVehicle />
      </div>

      <div className="hidden w-fit xl:flex capitalize flex-col text-center items-center justify-center text-xs">
        <div>
          parler à un spécialiste
          <br />
          <a href="tel:+1 800-883-0691" className="text-sm">
            +1 800-883-0691
          </a>
        </div>
      </div>

      {/* notif,show,cart */}
      <div className="w-3/12 md:w-fit flex gap-x-4 justify-center ml-auto">
        {/* store link */}
        <Link
          href={"/boutique"}
          className="flex flex-col items-center justify-center"
        >
          <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
          <span className="text-xs font-semibold text-center hidden md:block">
            Boutique
          </span>
        </Link>

        {/* cart link */}
        <div className="flex items-center">
          <Cart />
        </div>
      </div>

      {/* account */}
      <div className="h-full flex items-center ml-3">
        <AccountMenuItem />
      </div>
    </div>
  );
}
