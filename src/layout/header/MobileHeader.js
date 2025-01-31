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
import { DrawerComponent } from "./DrawerComponent";

export default function MobileHeader() {
  return (
    <div className="lg:hidden w-full border-b py-2 gap-y-4 px-2 grid grid-cols-1 relative">
      <div className="w-full flex items-center justify-between flex-wrap">
        {/* Logo */}
        <div className="w-2/12">
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
        <div className="w-3/12 flex gap-x-8 ml-auto items-center mr-10">
          {/* store link */}
          <Link
            href={"/boutique"}
            className="flex flex-col items-center justify-center"
          >
            <BuildingStorefrontIcon className="w-6 h-6 text-gray-500" />
            <span className="text-xs font-semibold text-center">
              Boutique
            </span>
          </Link>

          {/* cart link */}
          <div>
            <Cart />
          </div>
        </div>

        {/* account */}
        <div className="h-full flex items-center">
        <AccountMenuItem />
        </div>
        {/* search */}
      </div>

      <div className="w-full pr-2 flex items-center">
        {/* <Search /> */}
        <AlgoliaSearch />
      </div>
      <div className="flex items-center justify-between gap-x-4">
        <DrawerComponent />
        <NavSelectVehicle />
      </div>
    </div>
  );
}
