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

export default function MobileHeader() {
  return (
    <div className="lg:hidden w-full  items-center border-b py-2 gap-y-4 px-2 grid grid-cols-1 relative">
      <div className="flex items-center justify-between flex-wrap">
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
        {/* notif,show,cart */}
        <div className="w-3/12 flex gap-x-8 lg:gap-x-4 ml-auto">
          {/* store link */}
          <div>
            <Link href={"/boutique"}>
              <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
            </Link>
          </div>

          {/* cart link */}
          <div>
            <Cart />
          </div>
        </div>

        {/* account */}
        <AccountMenuItem />
        {/* search */}
        
      </div>
      <div className="w-full pr-2 flex items-center">
          {/* <Search /> */}
          <AlgoliaSearch />
        </div>
      <div className="flex items-center justify-between">
        <NavSelectVehicle />
      </div>
    </div>
  );
}
