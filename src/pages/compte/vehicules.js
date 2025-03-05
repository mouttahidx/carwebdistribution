import DashboardLayout from "@/components/accountComponents/DashboardLayout";
import LoadingModal from "@/components/accountComponents/LoadingModal";
import SelectVehicle from "@/components/homeComponents/SelectVehicle";
import useUserVehicle from "@/hooks/useUserVehicle";
import { addUserVehicle, deleteUserVehicle } from "@/lib/userVehicleUtils";
import { TrashIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ContentLoader from "react-content-loader";
import { ToastContainer, toast } from "react-toastify";

export default function Vehicules() {
  const LoaderPlaceHolder = (props) => (
    <ContentLoader
      viewBox="0 0 900 300"
      height={300}
      width={900}
      uniqueKey="vehcles"
      {...props}
    >
      <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
      <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
      <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
      <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
    </ContentLoader>
  );
  const { status, data, update } = useSession();
  const [vehicules, setVehicules] = useState([]);
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [localeVehicle,setLocalVehicle] = useUserVehicle();

  const handleAddVehicle = (vehicule) => {
   addUserVehicle(vehicule,update,signOut,setLoading,selected,data);
   setLocalVehicle(vehicule)
  };

  const handleDelete = (id) => {
    deleteUserVehicle(id,setLoading,setSelected,update,signOut,data,selected);
    setLocalVehicle(null);
  };

  useEffect(() => {
    if (
      status === "authenticated" &&
      data?.user?.token &&
      selected.length === 0
    ) {
      setLoading(true);
      const res = axios
        .get(
          process.env.NEXT_PUBLIC_WEBSITE_URL + "wp-json/wc/v3/user/vehicles",
          {
            params: {
              user_id: data.user.id,
            },
            headers: { Authorization: "Bearer " + data?.user?.token },
          }
        )
        .then((res) => {
          if (res.data.length > 1) {
            let vehicles_list = [];
            res.data.forEach((vehicle) => {
              vehicles_list.push({
                id: vehicle.term_id,
                name: vehicle.name,
                year: vehicle.year,
                make: vehicle.make,
                model: vehicle.model,
                subModel: vehicle.subModel,
              });
            });
            setSelected(vehicles_list);
            update(vehicles_list);
          }
          if (res.data.length === 1) {
            let vehicles_list = [];
            vehicles_list.push({
              id: res.data[0].term_id,
              name: res.data[0].name,
              year: res.data[0].year,
              make: res.data[0].make,
              model: res.data[0].model,
              subModel: res.data[0].subModel,
            });

            setSelected(vehicles_list);
            update(vehicles_list);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          if (error?.response?.data?.code === "jwt_auth_invalid_token") {
            signOut();
          }
          setLoading(false);
        });
    }
  }, [status]);

  if (status === "authenticated" && data) {
    return (
      <DashboardLayout>
        <h3 className="text-3xl font-semibold overflow-hidden text-ellipsis">
          Bonjour {data.user.name}!
        </h3>
        <p className="mt-2 mb-5 text-sm text-gray-400 font-light">
          {"Achetez les meilleures pièces pour votre véhicule."}
        </p>
        <>
          {/* vehicle search */}
          {/* <SelectVehicle setVehicules={setVehicules} /> */}
          {/* vehicle search results */}
          {/* <div className="mt-8 grid grid-cols-2 lg:grid-cols-5 gap-2">
            {vehicules.length > 0 &&
              vehicules.map((vehicule) => (
                <div
                  key={vehicule.term_id}
                  className="bg-black rounded-xl p-10 flex flex-col"
                >
                  <p className="text-lg md:text-2xl font-semibold text-rachel-red-700">
                    {vehicule.name}
                  </p>
                  <span className="text-sm text-gray-100 mb-3">
                    {vehicule.year} {vehicule.make} {vehicule.model}{" "}
                    {vehicule.subModel}
                  </span>
                  {data?.user?.vehicles?.some(
                    (v) => v?.id === vehicule.term_id
                  ) ? (
                    <span className="text-gray-300 text-xs">
                      Déjà sur votre liste
                    </span>
                  ) : (
                    <span
                      className="text-white text-xs hover:cursor-pointer hover:underline"
                      onClick={() => handleAddVehicle(vehicule)}
                    >
                      Choisir
                    </span>
                  )}
                </div>
              ))}
          </div> */}
        </>
        {/* user vehicles list */}
        <div className="mt-8 flex gap-3">
          {data.user.vehicles.length > 0 && (
            <div>
              <h3 className="text-base mb-2">Mes Véhicules</h3>
              <div className="flex gap-5 flex-row flex-wrap">
                {loading ? (
                  <LoaderPlaceHolder />
                ) : (
                  data.user.vehicles.map((vehicule, index) => (
                    <div
                      key={vehicule.id || index}
                      className="bg-black rounded-xl px-2 py-8 lg:p-5 w-[200px]"
                    >
                      <p className="text-lg md:text-xl font-semibold text-rachel-red-700">
                        {vehicule.name}
                      </p>
                      <span className="text-sm text-gray-100 mb-3">
                        {vehicule.year} {vehicule.make} {vehicule.model} -{" "}
                        {vehicule.subModel}
                      </span>
                      {selected && (
                        <div className="flex justify-between items-center mt-2">
                          <span
                            className="text-white text-xs hover:cursor-pointer hover:underline"
                            onClick={() =>
                              router.push(
                                `/boutique?par_vehicule=1&year=${vehicule.year}&make=${vehicule.make}&model=${vehicule.model}&submodel=${vehicule.subModel}`
                              )
                            }
                          >
                            Magasiner
                          </span>
                          <TrashIcon
                            className="w-5 h-5 fill-white cursor-pointer hover:fill-rachel-red-700"
                            onClick={() => handleDelete(vehicule.id)}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {loading && <LoadingModal loading={"pop-up"} text="Chargement..." />}
        </div>
        <ToastContainer className={"!z-[99999999999999]"} />{" "}
      </DashboardLayout>
    );
  }
  return <DashboardLayout></DashboardLayout>;
}
