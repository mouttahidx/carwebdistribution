"use client";

import useUserVehicle from "@/hooks/useUserVehicle";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [localeVehicle, setLocaleVehicle] = useUserVehicle();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    setVehicle(localeVehicle);
  }, [localeVehicle]);

  const deleteVehicle = () => {
    console.log("deleting...");
    setVehicle(null);
    setLocaleVehicle(null);
    localStorage.removeItem("user-vehicle");
    document.cookie = `user-vehicle=; path=/; max-age=0; SameSite=Lax`;

    if (router.pathname === "/boutique") {
      const { par_vehicule, year, make, model, submodel, ...routerQuery } =
        router.query;
      router.replace({
        query: { ...routerQuery },
      });
    }
  };

  useEffect(() => {}, [vehicle]);

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle, deleteVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

// Custom hook to use the context
export const useVehicleContext = () => {
  return useContext(VehicleContext);
};
