import { useEffect, useState } from "react";

export default function CartSubtotal({
  selectedMethod,
  setCouponApplied,
  couponApplied,
  subTotal,
}) {
  const [originalPrice, setOriginalPrice] = useState(subTotal);

  useEffect(() => {
    if (couponApplied.applied) {
      const tmp = subTotal / (1 - (couponApplied.amount / 100));
      setOriginalPrice(tmp);
    }
  }, [subTotal, couponApplied]);
  return (
    <div className="flex justify-between">
      <div className="text-sm">
        Sous-total:{" "}
        {couponApplied.applied && (
          <div className=" inline ">
            <span className="text-green-700 font-medium">
              (-{couponApplied.amount} %)
            </span>
            <br />
            <span
              className="mt-1 cursor-pointer font-semibold text-red-800 text-xs"
              onClick={() => setCouponApplied({ applied: false, amount: 0 })}
            >
              Annuler le code promo
            </span>
          </div>
        )}
      </div>
      <span className="text-base font-semibold">
        {!selectedMethod && (
          <p className="text-sm font-normal">
            (Sélectionnez votre province/livraison)
          </p>
        )}
        {selectedMethod &&
          (couponApplied.applied ? (
            <div className="flex flex-col">
              <span className="text-gray-500 line-through">
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "cad",
                }).format(originalPrice)}
              </span>

              <span>
                {new Intl.NumberFormat("fr-CA", {
                  style: "currency",
                  currency: "cad",
                }).format(subTotal)}
              </span>
            </div>
          ) : (
            new Intl.NumberFormat("fr-CA", {
              style: "currency",
              currency: "cad",
            }).format(subTotal)
          ))}
      </span>
    </div>
  );
}
