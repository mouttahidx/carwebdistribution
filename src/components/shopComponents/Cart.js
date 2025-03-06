import useOutsideClick from "@/hooks/useOutsideClick";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/outline";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "react-use-cart";

export default function Cart() {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
  } = useCart();
  const ref = useRef(null);
  const [hide, setHide] = useState(true);

  const hideCart = () => {
    setHide(true);
  };

  useOutsideClick(ref, hideCart);

  useEffect(() => {
    setHide(true);
  }, []);

  return (
    <>
      <div className="relative flex items-center">
        <ShoppingCartIcon
          className="w-6 h-6 text-gray-500 cursor-pointer "
          onClick={() => {
            setHide(false);
          }}
        />
        {totalUniqueItems > 0 && (
          <span className="absolute -top-2 -right-3 bg-rachel-red-700 text-white flex justify-center items-center text-sm w-5 h-5 rounded-full">
            {totalUniqueItems}
          </span>
        )}
      </div>
      <div
        className={`${
          hide ? "hidden bg-opacity-0" : " bg-opacity-60"
        } bg-black  ease-in-out z-50 !top-0 w-full right-0 h-[90vh] lg:h-screen transition duration-300 fixed`}
      ></div>

      <div
        className={`${
          hide ? "translate-x-full" : "translate-x-0"
        } bg-white  border rounded px-2 py-3 !top-0 md:w-5/12 xl:w-4/12 w-full h-[95vh] lg:h-screen right-0 fixed duration-300 delay-50 z-[9999999999]`}
        ref={ref}
      >
        <div className="flex justify-between items-center">
          <span className="font-semibold">Panier</span>
          <button
            onClick={() => {
              setHide(true);
            }}
          >
            x
          </button>
        </div>
        <hr className="my-5" />

        {isEmpty ? (
          <span className="text-sm">Le panier est vide</span>
        ) : (
          <>
            <ul className="flex flex-col h-[80%] overflow-y-auto items-stretch">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-start gap-x-2 pb-3 mb-3 border-b last:border-none"
                >
                  <Link href={"/produits/" + item?.slug} className="block w-[100px]">
                    {item.image ? (
                      <Image
                        className="object-contain w-full h-[70px]"
                        width={80}
                        height={80}
                        src={item.image.src}
                        alt={item.image.alt || item.name}
                        unoptimized
                      />
                    ) : (
                      <Image
                        className="object-contain w-full h-[70px]"
                        width={80}
                        height={80}
                        src={"/logo-dark.png"}
                        alt={item.name}
                        unoptimized
                      />
                    )}
                  </Link>
                  <div className="overflow-x-hidden w-10/12">
                    <Link
                      className="truncate w-8/12"
                      href={"/produits/" + item?.slug}
                    >
                      {item.name}
                    </Link>
                    <div className="flex gap-x-3 items-center mt-2 ">
                      <span className="text-sm w-14 border-r">Qté: {item.quantity}</span>
                      
                      <span className="font-semibold"> {new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format(item.itemTotal.toFixed(2))}</span>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto mr-2"
                      >
                        <TrashIcon className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-[#FDFDFD] z-50 absolute w-full bottom-3 lg:bottom-0 py-1 mt-3 bordert-t font-semibold flex justify-between items-center">
              <span>
                <span className="font-normal">Sous-total:</span> &nbsp;
                {new Intl.NumberFormat("fr-CA",{style:"currency",currency:"cad"}).format(cartTotal.toFixed(2))}
              </span>
              <span
                className="text-rachel-black-200 text-xs cursor-pointer hover:text-rachel-black-700"
                onClick={() => {
                  emptyCart();
                }}
              >
                Vider le panier
              </span>
              <span>
                <Link
                  href="/panier"
                  className="items-center bg-red-700 flex text-white text-sm hover:bg-rachel-red-900 duration-500 px-2 py-1 rounded mr-5"
                >
                  Voir le panier
                  <ArrowRightIcon className="w-4 h-4 text-white cursor-pointer ml-2" />
                </Link>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
}
