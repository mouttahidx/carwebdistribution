import Layout from "@/layout";
import {
  getAllTaxes,
  getProductBySlug,
  getShippingZoneLocations,
  getShippingZoneMethods,
  getShippingZones,
} from "@/lib/api";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Button, Label, Select, Spinner, Toast } from "flowbite-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useCart } from "react-use-cart";
import "react-toastify/dist/ReactToastify.css";
import PromoCode from "@/components/shopComponents/PromoCode";

const Panier = ({ shippingZones }) => {
  const {
    isEmpty,
    cartTotal,
    totalUniqueItems,
    items,
    updateItemQuantity,
    removeItem,
    emptyCart,
    metadata,
    setCartMetadata,
  } = useCart();

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [shippingMethodList, setShippingMethodList] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [_cartTotal, setCartTotal] = useState(cartTotal);
  const [total, setTotal] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [taxesList, setTaxesList] = useState(null);
  const [taxeRates, setTaxesRates] = useState([]);
  const [couponApplied, setCouponApplied] = useState({
    applied: false,
    amount: 0,
    code: "",
  });

  const handleShippingZoneChange = async (zone) => {
    setLoading(true);
    setShippingMethodList([]);
    setSelectedMethod(null);
    setSelectedAddress(zone);

    getShippingZoneMethods(zone)
      .then((res) => {
        if (res.status === 200) {
          setShippingMethodList(res.data);
          setTaxesRates([]);
        }
        setLoading(false);
      })
      .catch((err) => console.warn(err));
  };

  const handleShippingMethodChange = (method) => {
    const selected = shippingMethodList.find((x) => +x.id === +method);
    selected && setSelectedMethod(selected);
    const shippingCost =
      selected.settings.cost.value === "" ? 0 : +selected.settings.cost.value;
    selected && setSubtotal(shippingCost + +_cartTotal);
    handleTaxesCalculation(selectedAddress);
  };

  const handleCheckoutClick = () => {
    setCartMetadata({
      address: shippingZones.find((x) => +x.id === +selectedAddress),
      taxeRates,
      subtotal,
      total,
      couponApplied,
      shipping: {
        id: selectedMethod.id,
        name: selectedMethod.title,
        cost: selectedMethod.settings.cost.value,
      },
    });
    router.push("/paiement");
  };

  /* ----------------------- get selected shipping location id , fetch its infos the state name 
  with taxes rates and calculate total price with taxes ----------------------- */
  const handleTaxesCalculation = (location) => {
    setLoading(true);
    getShippingZoneLocations(location).then((res) => {
      // check if response is defined else show error
      if (res) {
        if (res.status >= 200 && res.status <= 250) {
          const shippingState = res.data[0];

          // check if state
          if (
            res.data.length > 0 &&
            shippingState &&
            shippingState.type === "state"
          ) {
            const code = shippingState.code.split(":")[1];
            const stateTaxes = taxesList.filter((taxe) => taxe.state === code);

            setTaxesRates(stateTaxes);
          }

          // check if country
          if (
            res.data.length > 0 &&
            shippingState &&
            shippingState.type === "country"
          ) {
            setTaxesRates({ name: "-", rate: 0 });
          }
        }
      } else {
        toast.error(
          "Une erreur est survenue , merci de réessayer ou contacter le support",
          { autoClose: 8000 }
        );
        setSelectedMethod(null);
      }

      setLoading(false);
    });
  };

  /* ----------------------------- fetch all taxes ---------------------------- */
  const getTaxesList = async () => {
    setLoading(true);
    const { data, status } = await getAllTaxes();
    if (status >= 200 && status <= 250) {
      data.length > 0 && setTaxesList(data);
    }
    setLoading(false);
  };

  /* -------------------------------------------------------------------------- */
  /*                                 use Effects                                */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    // if no shipping method selected, set subtotal to cart total
    if (shippingMethodList < 1) {
      setSubtotal(_cartTotal);
    }
  }, [shippingMethodList]);

  // update total when taxerates.subtotal change
  useEffect(() => {
    if (selectedMethod) {
      if (taxeRates.length > 0) {
        let taxesTotal = 0;
        taxeRates.forEach((taxe) => {
          taxesTotal += +taxe.rate;
        });

        const sub = +selectedMethod.settings.cost.value + +_cartTotal;
        setSubtotal(sub);
        setTotal((taxesTotal * sub) / 100 + sub);
      } else {
        setTotal(subtotal);
      }
    } else {
      setTotal(subtotal);
    }
  }, [taxeRates, _cartTotal, subtotal]);

  useEffect(() => {
    if (couponApplied.applied) {
      setCartTotal(cartTotal - (cartTotal * couponApplied.amount) / 100);
    } else {
      setCartTotal(cartTotal);
    }
  }, [couponApplied]);

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
    setSubtotal(_cartTotal);
  };

  useEffect(() => {
    // test if cart metadata has address of user stored and set it as default value for address

    if (metadata && metadata.address) {
      handleShippingZoneChange(metadata.address.id);
    }
    getTaxesList();

    /* ------------------- check if product exists in Backend ------------------- */
    checkProducts();
  }, []);

  useEffect(() => {
    setCartTotal(cartTotal);
  }, [cartTotal]);

  return (
    <Layout suppressHydrationWarning={true}>
      <ToastContainer className={"!z-[99999999999999]"} />{" "}
      <div className="w-full lg:flex gap-x-5 pb-32 max-w-[1400px] mx-auto">
        {/* ------------------------------- Cart lines ------------------------------- */}
        <div className="px-2 py-3  rounded w-full lg:w-8/12 mb-10 lg:mb-0">
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
              <PromoCode
                couponApplied={couponApplied}
                setCouponApplied={setCouponApplied}
                disabled={!selectedMethod || subtotal === 0}
              />
              <table className="border bg-white table-auto overflow-x-auto w-full ">
                <thead className="bg-gray-100 font-semibold">
                  <tr className="text-sm ">
                    <td className="p-2">Produit</td>
                    <td className="p-2 text-center">Qté</td>
                    <td className="p-2 text-center">Prix</td>
                    <td className="p-2 text-center">Retirer</td>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y ${loading && "cursor-not-allowed"}`}
                >
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
                            <p className="text-sm md:text-base break-words">
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
                        ${item.itemTotal.toFixed(2)}
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

        {/* ------------------------------ Cart summary ------------------------------ */}
        {totalUniqueItems > 0 && (
          <div className="bg-white mt-14  py-3 lg:py-5 border rounded w-full lg:w-4/12">
            <div className="px-2 lg:px-5 border-b pb-5">
              <h4 className="font-semibold capitalize text-lg">
                Récapitulatif de la commande
              </h4>
              <h4 className="text-xs  text-gray-400">
                {totalUniqueItems} élement(s) dans le panier
              </h4>
            </div>
            <div className="px-2 lg:px-5 py-5 ">
              <div className="flex justify-between">
                {/* ---------------------------- shipping address ---------------------------- */}
                <p className=" text-sm">Adresse de livraison: </p>
                <div className="flex flex-col gap-y-3">
                  <div className="max-w-md" id="select">
                    <div className="mb-2 block">
                      <Label
                        htmlFor="countries"
                        value="Sélectionnez votre province"
                        className="pr-1"
                      />
                      {loading && <Spinner className="fill-rachel-red-700" />}
                    </div>
                    <Select
                      disabled={loading}
                      required
                      defaultValue={
                        metadata && metadata.address
                          ? metadata.address.id
                          : "DEFAULT"
                      }
                      onChange={(e) => {
                        handleShippingZoneChange(e.target.value);
                      }}
                    >
                      <option disabled value={"DEFAULT"}>
                        Sélectionnez
                      </option>
                      {shippingZones?.length > 0 &&
                        shippingZones.slice(1).map((shippingZone) => (
                          <option key={shippingZone.id} value={shippingZone.id}>
                            {shippingZone.name}
                          </option>
                        ))}
                    </Select>
                  </div>

                  {/* ----------------------------------------shipping methods --------------------------------------------------*/}
                  {shippingMethodList?.length > 0 && (
                    <div className="max-w-md" id="select">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="countries"
                          value="Sélectionnez la méthode de livraison"
                          className="pr-1"
                        />
                        {loading && <Spinner className="fill-rachel-red-700" />}
                      </div>
                      <Select
                        disabled={loading}
                        required
                        defaultValue={"DEFAULT"}
                        onChange={(e) => {
                          handleShippingMethodChange(e.target.value);
                        }}
                      >
                        <option disabled value={"DEFAULT"}>
                          Sélectionnez
                        </option>
                        {shippingMethodList?.length > 0 &&
                          shippingMethodList.map((shippingMethod) => (
                            <option
                              key={shippingMethod.id}
                              value={shippingMethod.id}
                            >
                              {shippingMethod.title} - $
                              {shippingMethod.settings.cost.value === ""
                                ? 0
                                : shippingMethod.settings.cost.value}
                            </option>
                          ))}
                      </Select>
                      <p className="bg-rachel-red-700 bg-opacity-70 text-white text-xs p-1 rounded mt-4 font-semibold">
                        Les produits "Oversize" peuvent avoir des frais
                        supplémentaires pour la livraison. Frais de livraison
                        final confirmé lors de l'envoie.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* ----------------------------- subtotal ----------------------------- */}
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-sm">
                  Sous-total:{" "}
                  {couponApplied.applied && (
                    <div className=" inline ">
                      <span className="text-green-700 font-medium">
                        (-{couponApplied.amount} %)
                      </span>
                      <span
                        className="ml-3 cursor-pointer font-semibold text-red-800 text-xs"
                        onClick={() =>
                          setCouponApplied({ applied: false, amount: 0 })
                        }
                      >
                        Annuler le code promo
                      </span>
                    </div>
                  )}
                </p>
                <span className="text-base font-semibold">
                  {!selectedMethod && (
                    <p className="text-sm font-normal">
                      (Merci de sélectionnez votre province/livraison)
                    </p>
                  )}
                  {selectedMethod && "$" + _cartTotal.toFixed(2)}
                </span>
              </div>
              {/* ----------------------------- shipping price ----------------------------- */}
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-sm">Livraison: </p>
                <span className="text-base font-semibold">
                  {!selectedMethod && (
                    <p className="text-sm font-normal">
                      (Merci de sélectionnez votre province/livraison)
                    </p>
                  )}
                  {selectedMethod &&
                    "$" + Number(selectedMethod.settings.cost.value).toFixed(2)}
                </span>
              </div>

              {/* ---------------------------------- Taxes --------------------------------- */}
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-sm">Taxes: </p>
                <span className="text-base font-semibold">
                  {!selectedMethod && (
                    <p className="text-sm font-normal">
                      (Merci de sélectionnez votre province/livraison)
                    </p>
                  )}
                  <div className="flex flex-col text-sm divide-y-2">
                    {!loading &&
                      selectedMethod &&
                      taxeRates.length > 0 &&
                      taxeRates.map((taxe) => (
                        <span
                          key={taxe.id}
                          className="flex justify-between py-2 gap-x-5"
                        >
                          <span>{taxe.name} : </span>
                          <span>
                            $
                            {((Number(taxe.rate) * +subtotal) / 100).toFixed(2)}
                          </span>
                        </span>
                      ))}

                    {selectedMethod && loading && (
                      <Spinner className="fill-rachel-red-700" />
                    )}
                  </div>
                </span>
              </div>
              {/* ----------------------------- subtotal ----------------------------- */}
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-sm">Total HT: </p>
                <span className="text-base font-semibold">
                  {!selectedMethod && (
                    <p className="text-sm font-normal">
                      (Merci de sélectionnez votre province/livraison)
                    </p>
                  )}
                  {selectedMethod && "$" + subtotal.toFixed(2)}
                </span>
              </div>
              {/* --------------------------------------Total-------------------------------- */}

              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-sm">Total: </p>
                <span className="text-base font-semibold text-red-600">
                  {selectedMethod ? !loading && "$" + total.toFixed(2) : cartTotal.toFixed(2) }
                  {}
                </span>
              </div>

              {/* --------------------------------------paiement button-------------------------------- */}
              <hr className="my-4" />
              <div className="flex justify-end">
                {" "}
                <Button
                  onClick={handleCheckoutClick}
                  className="bg-rachel-red-800 hover:bg-rachel-red-900 duration-500 disabled:hover:bg-rachel-red-900"
                  disabled={!selectedMethod}
                >
                  Paiement
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Panier), {
  ssr: false,
});

export async function getStaticProps() {
  const { data } = await getShippingZones();

  return {
    props: {
      shippingZones: data || [],
    },
  };
}
