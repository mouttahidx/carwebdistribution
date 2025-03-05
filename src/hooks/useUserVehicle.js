import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserVehicle = () => {
  const { data, status } = useSession();
  const [localVehicle, setLocalVehicle] = useState(null);

  useEffect(() => {
    if (status !== "loading") {      
      if (status !== "authenticated") {
        if (typeof window !== "undefined") {
          const vehicle = localStorage.getItem("user-vehicle") || null;
          vehicle && setLocalVehicle(JSON.parse(vehicle));

        }
      } else {
        data?.user?.vehicles?.length > 0 &&
          setLocalVehicle(data?.user?.vehicles[0]);

      }


    }
  }, [status, data]);

  return [localVehicle, setLocalVehicle ];
}

export default useUserVehicle;