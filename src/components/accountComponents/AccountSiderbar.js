import {
  ArrowRightEndOnRectangleIcon,
  Bars3Icon,
  ShoppingCartIcon,
} from "@heroicons/react/24/solid";
import { Sidebar } from "flowbite-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import {  FaCar, FaFileInvoice } from "react-icons/fa";

export default function AccountSidebar() {
  const router = useRouter();
  return (
    <Sidebar aria-label="Default sidebar example" className="w-full lg:w-2/12 ">
      <Sidebar.Items>
        {/* ----------------------------- hide on mobile ----------------------------- */}
        <Sidebar.ItemGroup className="hidden lg:block">
          <Sidebar.Item
            href={"/compte/vehicules"}
            icon={FaCar}
            className={
              router.pathname === "/compte/vehicules" ||
              router.pathname === "/compte"
                ? "text-rachel-red-700"
                : ""
            }
          >
            <p>Véhicules</p>
          </Sidebar.Item>

          <Sidebar.Item
            href={"/compte/commandes"}
            icon={ShoppingCartIcon}
            className={
              router.pathname === "/compte/commandes"
                ? "text-rachel-red-700 fill-red-400"
                : ""
            }
          >
            <p>Commandes</p>
          </Sidebar.Item>
          <Sidebar.Item
            href={"/compte/informations"}
            icon={FaFileInvoice}
            className={
              router.pathname === "/compte/informations"
                ? "text-rachel-red-700"
                : ""
            }
          >
            <p>Informations</p>
          </Sidebar.Item>
        </Sidebar.ItemGroup>

        {/* ---------------------------- hide on lg screen --------------------------- */}
        <Sidebar.ItemGroup className="block lg:hidden !border-t-0 !mt-0">
          <Sidebar.Collapse open={true} label="Menu du profile" icon={Bars3Icon}>
            <Sidebar.Item
              href={"/compte/vehicules"}
              icon={FaCar}
              className={
                router.pathname === "/compte/vehicules" ||
                router.pathname === "/compte"
                  ? "text-rachel-red-700"
                  : ""
              }
            >
              <p>Véhicules</p>
            </Sidebar.Item>

            <Sidebar.Item
              href={"/compte/commandes"}
              icon={ShoppingCartIcon}
              className={
                router.pathname === "/compte/commandes"
                  ? "text-rachel-red-700 fill-red-400"
                  : ""
              }
            >
              <p>Commandes</p>
            </Sidebar.Item>
            <Sidebar.Item
              href={"/compte/informations"}
              icon={FaFileInvoice}
              className={
                router.pathname === "/compte/informations"
                  ? "text-rachel-red-700"
                  : ""
              }
            >
              <p>Informations</p>
            </Sidebar.Item>
          </Sidebar.Collapse>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.CTA
        onClick={() => signOut()}
        className="group lg:!mt-16 cursor-pointer bg-black  text-white fill-white w-fit lg:w-full !rounded-full flex py-2 justify-center items-center gap-x-2 text-sm hover:shadow-lg duration-200 shadow-black ml-4 lg:ml-0"
      >
        <ArrowRightEndOnRectangleIcon className="fill-white w-6 h-6 group-hover:fill-rachel-red-700  duration-200 " />
        <p className="rounded-full ">Se déconnecter</p>
      </Sidebar.CTA>
    </Sidebar>
  );
}
