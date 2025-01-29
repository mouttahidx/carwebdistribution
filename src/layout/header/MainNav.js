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
    <div className="hidden w-full md:flex items-center border-b justify-between md:justify-evenly py-2 gap-y-4 px-2 lg:px-4 md:flex-nowrap flex-wrap relative">
      {/* Logo */}
      <div className="w-2/12 md:w-2/12 lg:w-3/12 ">
        <Link href="/" className="flex flex-col items-center justify-start">
          <Image
            src="/logo-dark.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full max-w-[90px] lg:max-w-[130px] h-auto object-contain"
            alt="Car web distribution logo"
            priority="false"
          />
          <span className="text-xs font-semibold text-center hidden md:block">
            carwebdistribution
          </span>
        </Link>
      </div>
      {/* search */}
      <div className="w-8/12 pr-2 lg:ml-14 md:w-8/12 lg:w-7/12 flex items-center">
        {/* <Search /> */}
        <AlgoliaSearch />
      </div>

      {/* Select Vehicle */}
      <div className="w-1/12 md:w-2/12">
        <NavSelectVehicle />
      </div>

      {/* notif,show,cart */}
      <div className="w-3/12 md:w-2/12 flex gap-x-4 ml-3 justify-center">
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
        <div>
          <Cart />
        </div>
      </div>

      {/* account */}
      <AccountMenuItem />
    </div>
  );
}
