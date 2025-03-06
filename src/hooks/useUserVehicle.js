/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const useUserVehicle = () => {
  const { data, status } = useSession();
  const [localVehicle, setLocalVehicle] = useState();

  useEffect(() => {

    let tmp_vehicle = null;
    if (status !== "loading") {
      if (status !== "authenticated") {
        // non authenticated user
        if (typeof window !== "undefined") {
          const vehicle = localStorage.getItem("user-vehicle") || null;
          vehicle && setLocalVehicle(JSON.parse(vehicle));
          tmp_vehicle = JSON.parse(vehicle);
        }
      } else {
        // authenticated
        data?.user?.vehicles?.length > 0 &&
          setLocalVehicle(data?.user?.vehicles[0]);

          console.log("logged: ", data?.user?.vehicles[0]);
        tmp_vehicle = data?.user?.vehicles[0];
      }
    }

    tmp_vehicle
      ? (document.cookie = `user-vehicle=${JSON.stringify({
          id: tmp_vehicle.term_id,
          name: tmp_vehicle.name,
          year: tmp_vehicle.year,
          make: tmp_vehicle.make,
          model: tmp_vehicle.model,
          subModel: tmp_vehicle.subModel,
          slug: tmp_vehicle.slug,
          count: tmp_vehicle.count,
        })}; path=/; max-age=31536000; SameSite=Lax`)
      : (document.cookie = `user-vehicle=; path=/; max-age=0; SameSite=Lax`);

  }, [status]);


  return [localVehicle, setLocalVehicle];
};

export default useUserVehicle;
