import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function useByVehicle(setVehicle) {
  const [localVehicle, setLocalVehicle] = useState(null);
  const { data, status } = useSession();

     useEffect(() => {
        if (status !== "authenticated" && status !== "loading") {
          if (typeof window !== "undefined") {
            const vehicle = localStorage.getItem("user-vehicle") || null;
            vehicle && setLocalVehicle(JSON.parse(vehicle));
          }
        }
      }, [status]);


}
