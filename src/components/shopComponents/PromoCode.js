import React, { useEffect, useState } from "react";
import Button from "../Button";
import { toast } from "react-toastify";
import { getPromoCode } from "@/lib/api";

export default function PromoCode({
  setCouponApplied,
  disabled,
  couponApplied,
}) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [appliedCodes, setAppliedCodes] = useState([]);

  if (appliedCodes.length > 0 && couponApplied.applied === false) {
    setAppliedCodes([]);
    toast.warning('Code promo annulé')
  }

  useEffect(() => {
    if (results && appliedCodes.includes(results.id)) {
      toast.warning("Code déjà appliqué");
      return;
    }
    if (results && results.discount_type === "percent") {
      setCouponApplied({ applied: true, amount: Number(results.amount),code:results.code });
      setAppliedCodes((curr) => [...curr, results.id]);
      toast.success("Code promo appliqué!");
    }
  }, [results]);

  const applyCode = async () => {
    if (code.trim() === "") {
      toast.warning("Le code promo est vide");
      return;
    }

    try {
      setLoading(true);
      const response = await getPromoCode(code);
      setLoading(false);

      if (response.status >= 500) {
        toast.error("Merci de réessayer plus tard.");
      }
      if (response.status === 200 && response.data.length === 0) {
        toast.warning("Code promo introuvable.");
      }
      if (response.status === 200 && response.data.length > 0) {
        setResults(response.data[0]);
      }
    } catch (error) {}
  };

  return (
    <div className="flex mb-4 gap-x-2">
      <input
        disabled={disabled}
        type="text"
        placeholder="Code Promo"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="!rounded disabled:bg-gray-200 disabled:cursor-not-allowed"
      />
      <Button
        text={"Appliquer"}
        icon={false}
        onClick={applyCode}
        disabled={loading}
      />
    </div>
  );
}
