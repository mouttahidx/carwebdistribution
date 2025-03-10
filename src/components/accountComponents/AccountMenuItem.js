import {
  ArrowLeftOnRectangleIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Dropdown } from "flowbite-react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";
import {
  FaCar,
  FaFileInvoice,
  FaRegUserCircle,
  FaShoppingBag,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

export default function AccountMenuItem() {
  const { data, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex justify-end">
      <Dropdown label="Compte" color={"#ffffff"} className="z-40" inline renderTrigger={()=><span className=""><FaUser className="border-2 p-0.5 border-gray-500 fill-gray-500 rounded-full cursor-pointer w-6 h-6" /></span>} >
        {status === "authenticated" && (
          <>
            <Dropdown.Header
              onClick={() => {
                router.push("/compte/informations");
              }}
              className="cursor-pointer hover:bg-gray-100 overflow-x-hidden flex items-center"
            >
              <UserCircleIcon className="w-5 h-5 mr-1.5"/>
              <span className="">{data.user.name || data.user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item
              icon={FaCar}
              onClick={() => router.push("/compte/vehicules")}
            >
              <span className="text-sm">Véhicules</span>
            </Dropdown.Item>
            <Dropdown.Item
              icon={FaFileInvoice}
              onClick={() => router.push("/compte/informations")}
            >
              <span className="text-sm">Informations</span>
            </Dropdown.Item>
            <Dropdown.Item
              icon={ShoppingCartIcon}
              onClick={() => router.push("/compte/commandes")}
            >
              <span className="text-sm">Commandes</span>
            </Dropdown.Item>
            <Dropdown.Divider />

            <Dropdown.Item onClick={() => {
              
              signOut()}}>
              <span className="text-sm text-red-500 w-full">Quitter</span>
            </Dropdown.Item>
          </>
        )}

        {status === "unauthenticated" && (
          <>
            <Dropdown.Item
              onClick={() => {
                signIn();
              }}
            >
              <ArrowLeftOnRectangleIcon className="w-5 mr-2" />
              <span className="text-sm text-rachel-black-950">Connexion</span>
            </Dropdown.Item>

            <Dropdown.Item
              onClick={() => {
                router.push("/sinscrire");
              }}
            >
              <UserCircleIcon className="w-5 mr-2" />
              <span className="text-sm text-rachel-black-950">
                {"S'inscrire"}
              </span>
            </Dropdown.Item>
          </>
        )}
      </Dropdown>
    </div>
  );
}
