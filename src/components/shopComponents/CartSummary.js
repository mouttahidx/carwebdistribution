/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "flowbite-react";
import { useCart } from "react-use-cart";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CartShipping from "./CartShipping";
import CartFees from "./CartFees";
import CartSubtotal from "./CartSubtotal";
import CartTaxes from "./CartTaxes";

export default function CartSummary({ couponApplied, setCouponApplied }) {
  const { totalUniqueItems, cartTotal, setCartMetadata } = useCart();
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState();
  const router = useRouter();
  const [shippingCost, setShippingCost] = useState();
  const [fees, setFees] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [taxesTotal, setTaxesTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [locationId, setLocationId] = useState();
  const [taxeRates, setTaxesRates] = useState();
  const [address, setAddress] = useState();

  const handleCheckoutClick = () => {
    router.push("/paiement");
  };

  useEffect(() => {
    const tmpSubtotal = cartTotal + shippingCost + fees;
    if (couponApplied.applied) {
      const subTotalWithCoupon =
        tmpSubtotal - (tmpSubtotal * couponApplied.amount) / 100;
      setSubtotal(subTotalWithCoupon);
    } else {
      setSubtotal(tmpSubtotal);
    }
  }, [selectedMethod, cartTotal, couponApplied]);

  useEffect(() => {
    setTotal((taxesTotal * subtotal) / 100 + subtotal);
  }, [subtotal, taxesTotal]);

  useEffect(() => {
    selectedMethod &&
      setCartMetadata({
        address,
        taxeRates,
        subtotal,
        fees,
        total,
        couponApplied,
        shipping: {
          id: selectedMethod.id,
          name: selectedMethod.title,
          cost: selectedMethod.settings.cost.value,
        },
      });
  }, [total]);

  return (
    <div className="bg-white mt-14  py-3 lg:py-5 border rounded w-full">
      <div className="px-2 lg:px-5 border-b pb-5">
        <h4 className="font-semibold capitalize text-lg">
          Récapitulatif de la commande
        </h4>
        <h4 className="text-xs  text-gray-400">
          {totalUniqueItems} élement(s) dans le panier
        </h4>
      </div>
      <div className="px-2 lg:px-5 py-5 ">
        {/* ---------------------------- shipping address ---------------------------- */}
        <CartShipping
          setSelectedMethod={setSelectedMethod}
          setShippingCost={setShippingCost}
          setLocationid={setLocationId}
          setAddress={setAddress}
        />
        {/* ----------------------------- Fees ----------------------------- */}
        {process.env.NEXT_PUBLIC_APPLY_FEES === "true" && (
          <>
            <hr className="my-4" />
            <CartFees setFees={setFees} />
          </>
        )}

        {/* ----------------------------- subtotal ----------------------------- */}
        <hr className="my-4" />
        <CartSubtotal
          couponApplied={couponApplied}
          setCouponApplied={setCouponApplied}
          selectedMethod={selectedMethod}
          subTotal={subtotal}
        />

        {/* ---------------------------------- Taxes --------------------------------- */}
        <hr className="my-4" />
        <CartTaxes
          selectedMethod={selectedMethod}
          location={locationId}
          subtotal={subtotal}
          setTaxesTotal={setTaxesTotal}
          setTaxesRates={setTaxesRates}
        />

        {/* ----------------------------- total before taxes ----------------------------- */}
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-sm">Total HT: </p>
          <span className="text-base font-semibold">
            {!selectedMethod && (
              <p className="text-sm font-normal">
                (Sélectionnez votre province/livraison)
              </p>
            )}
            {selectedMethod &&
              new Intl.NumberFormat("fr-CA", {
                style: "currency",
                currency: "cad",
              }).format(subtotal)}
          </span>
        </div>

        {/* --------------------------------------Total-------------------------------- */}
        <hr className="my-4" />
        <div className="flex justify-between">
          <p className="text-sm">Total: </p>
          <span className="text-base font-semibold text-red-600">
            {selectedMethod
              ? !loading &&
                new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "cad",
                }).format(total)
              : new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "cad",
                }).format(cartTotal)}
          </span>
        </div>

        {/* --------------------------------------paiement button-------------------------------- */}
        <hr className="my-4" />
        <div className="flex justify-end">
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
  );
}
