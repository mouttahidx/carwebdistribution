/* eslint-disable react-hooks/exhaustive-deps */
import { TrashIcon } from "@heroicons/react/24/solid";
import Button from "../Button";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import { getProductBySlug } from "@/lib/api";

export default function CartTable() {
  const {
    totalUniqueItems,
    items,
    removeItem,
    emptyCart,
    updateItemQuantity,
    isEmpty,
  } = useCart();
  const [loading, setLoading] = useState(false);

  const checkProducts = () => {
    setLoading(true);
    items.forEach(async (item) => {
      const result = await getProductBySlug(item.slug);
      if (result.length === 0) {
        toast.error(`Produit (${item.name}) effacé du panier, non disponible`, {
          position: "bottom-left",
          theme: "dark",
          autoClose: 2500,
        });
        removeItem(item.id);
      }
    });
  };

  useEffect(() => {
    /* ------------------- check if product exists in Backend ------------------- */
    checkProducts();
  }, []);

  return (
    <div className="px-2 py-3  rounded w-full mb-10 lg:mb-0">
      <div className="flex justify-between items-center">
        <h5 className="font-semibold">Panier</h5>
      </div>
      <hr className="my-5" />

      {isEmpty ? (
        <div>
          <h3 className="text-sm">Le panier est vide</h3>
          <Button
            size="sm"
            onClick={() => {
              router.push("/boutique");
            }}
            className="bg-rachel-red-700 mt-3 text-white hover:bg-rachel-red-900 duration-500"
          >
            Magasiner
          </Button>
        </div>
      ) : (
        <div className=" max-h-[550px] overflow-auto">
          <table className="border bg-white table-auto overflow-x-auto w-full ">
            <thead className="bg-gray-100 font-semibold">
              <tr className="text-sm ">
                <td className="p-2">Produit</td>
                <td className="p-2 text-center">Qté</td>
                <td className="p-2 text-center">Prix</td>
                <td className="p-2 text-center">Retirer</td>
              </tr>
            </thead>
            <tbody className={`divide-y ${loading && "cursor-not-allowed"}`}>
              {items.map((item) => (
                <tr className="text-black" key={item.id}>
                  <td className="pl-1 pr-2 py-4 max-w-[500px]">
                    <Link
                      href={"/produits/" + item?.slug}
                      className="flex gap-x-2 pb-3 mb-3  items-start justify-start"
                    >
                      {item.image ? (
                        <Image
                          className="object-cover w-[50px] lg:w-[100px]"
                          width={100}
                          height={100}
                          src={item.image.src}
                          alt={item.image.alt}
                        />
                      ) : (
                        <Image
                          className="object-cover w-[50px] lg:w-[100px]"
                          width={100}
                          height={100}
                          src={"/logo-dark.png"}
                          alt={item.name}
                        />
                      )}
                      <div className="flex-grow">
                        <p className="text-xs md:text-base break-words overflow-hidden w-16 lg:w-8/12 h-12">
                          {item.name}
                        </p>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: item.shortDescription,
                          }}
                          className="hidden md:inline-block max-h-20 overflow-y-hidden text-sm text-gray-500"
                        />
                      </div>
                    </Link>
                  </td>
                  <td className="w-[75px] px-2">
                    <div className="flex w-full gap-x-1 justify-center items-center ">
                      {item.quantity > 1 && (
                        <button
                          className="bg-rachel-black-700  w-5 h-5 flex justify-center items-center rounded text-white"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                        >
                          -
                        </button>
                      )}
                      {item.quantity}
                      {item.maxQuantity ? (
                        item.quantity < item.maxQuantity && (
                          <button
                            className="bg-rachel-black-700  w-5 h-5 flex justify-center items-center rounded text-white"
                            onClick={() =>
                              updateItemQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        )
                      ) : (
                        <button
                          className="bg-rachel-black-700  w-5 h-5 flex justify-center items-center rounded text-white"
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                        >
                          +
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="w-[75px] text-center">
                    {new Intl.NumberFormat("fr-CA", {
                      style: "currency",
                      currency: "cad",
                    }).format(item.itemTotal.toFixed(2))}
                  </td>
                  <td className="w-fit text-center">
                    <button onClick={() => removeItem(item.id)}>
                      <TrashIcon className="w-5 h-5 hover:text-rachel-red-800 duration-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-3 bordert-t font-semibold flex justify-end items-center">
        {totalUniqueItems > 0 && (
          <span>
            <Button
              size="sm"
              onClick={() => {
                emptyCart();
              }}
              className="bg-rachel-black-900 text-white hover:bg-rachel-red-900 duration-500"
            >
              Vider le panier
            </Button>
          </span>
        )}
      </div>
    </div>
  );
}
