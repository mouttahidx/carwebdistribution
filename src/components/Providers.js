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

  useEffect(() => {

    if(!vehicle)
    {
      if (router.pathname === "/boutique") {
        console.log(router.query)
        const { par_vehicule, year, make, model, submodel, ...routerQuery } =
          router.query;
        router.replace({
          query: { ...routerQuery },
        });
      }
    }


    if (!vehicle && localeVehicle) {
      setLocaleVehicle(null);     
    }
  }, [vehicle]);

  return (
    <VehicleContext.Provider value={{ vehicle, setVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
}

// Custom hook to use the context
export const useVehicleContext = () => {
  return useContext(VehicleContext);
};
