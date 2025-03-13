"use client";

import useUserVehicle from "@/hooks/useUserVehicle";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const VehicleContext = createContext();

export function VehicleProvider({ children }) {
  const [localeVehicle, setLocaleVehicle] = useUserVehicle();
  const router = useRouter();
  const [vehicle, setVehicle] = useState(null);
  const [vehicleRemoved,setVehicleRemoved] = useState(false);

  useEffect(() => {
    setVehicle(localeVehicle);
  }, [localeVehicle]);

  const deleteVehicle = () => {
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

  useEffect(() => {
    if(vehicle){
      document.cookie = `user-vehicle=${JSON.stringify({
        id: vehicle.term_id,
        name: vehicle.name,
        year: vehicle.year,
        make: vehicle.make,
        model: vehicle.model,
        subModel: vehicle.subModel,
        slug: vehicle.slug,
        count: vehicle.count,
      })}; path=/; max-age=31536000; SameSite=Lax`;
    }
  }, [vehicle]);

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
