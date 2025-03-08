/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";

export default function CartFees({ setFees }) {
  const FEES = 10;
  useEffect(() => {
    process.env.NEXT_PUBLIC_APPLY_FEES === 'true' && setFees(FEES);
  }, []);

  return (
    <div className="flex justify-between">
      <p className="text-sm">Frais de manutention:</p>
      <span className="text-base font-semibold">
        {new Intl.NumberFormat("fr-CA", {
          style: "currency",
          currency: "cad",
        }).format(FEES)}
      </span>
    </div>
  );
}
