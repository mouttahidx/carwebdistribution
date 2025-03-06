"use client";

import useUserVehicle from "@/hooks/useUserVehicle";
import { createContext, useContext, useEffect, useState } from "react";

const VehicleContext = createContext();

export function VehicleProvider({ children }) {

  const [localeVehicle, setLocaleVehicle] = useUserVehicle();
  
  const [vehicle, setVehicle] = useState(null);

  useEffect(() => {
    setVehicle(localeVehicle)

  },[localeVehicle])

  useEffect(() => {!vehicle && localeVehicle && setLocaleVehicle(null)},[vehicle])





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
