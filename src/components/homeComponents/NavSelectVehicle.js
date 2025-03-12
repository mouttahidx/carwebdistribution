/* eslint-disable react-hooks/exhaustive-deps */
import { Modal, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SelectVehicle from "@/components/homeComponents/SelectVehicle";
import { ToastContainer, toast } from "react-toastify";
import { TrashIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { addUserVehicle, deleteUserVehicle } from "@/lib/userVehicleUtils";
import usePartsCount from "@/hooks/usePartsCount";
import { useVehicleContext } from "../Providers";

export default function NavSelectVehicle() {
  const { data, status, update } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [vehicles, setVehicles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const {vehicle, setVehicle, deleteVehicle} = useVehicleContext();

  useEffect(() => {    
    if (router.query?.select_vehicle) {
      !openModal ? setOpenModal(1) : setOpenModal(0);

    } else {
      setOpenModal(false);
    }
  }, [router.query]);



  const handleAddVehicle = (item) => {
    setVehicle({
      id: item.term_id,
      ...item,
    });

    if (status !== "authenticated") {
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "user-vehicle",
          JSON.stringify({
            id: item.term_id,
            ...item
          })
        );
      }
    } else {
      addUserVehicle(item, update, signOut, setLoading, selected, data);
    }

    toast.success("Véhicule ajouté avec succès!");

    setOpenModal(false);
    router.push(
      `/boutique?par_vehicule=1&year=${item?.year}&make=${item?.make}&model=${item?.model}&submodel=${item?.subModel}`
    );
  };

  const handleDelete = () => {
    deleteVehicle()
    setVehicles(null)
    if (status !== "authenticated") {
      localStorage.removeItem("user-vehicle");
    } else if (status === "authenticated") {
      deleteUserVehicle(
        vehicle.id,
        setLoading,
        setSelected,
        update,
        signOut,
        data,
        selected
      );
    }
  
    toast.success("Véhicule supprimé avec succès");
    setOpenModal(false)
  };

  return (
    <div className="w-full flex flex-col">
      <div className="bg-gray-100 p-3 py-2 rounded-t-md w-full grid grid-cols-3 items-center border-b">
        <div
          className={`col-span-${
            vehicle ? "2" : "1"
          } flex relative justify-start`}
        >
          <div className="relative flex items-center w-10 flex-nowrap">
            <Image
              src="/car.svg"
              className=" w-9"
              width={50}
              height={50}
              unoptimized
              alt="car icon"
            />
            <span className="absolute bg-rachel-red-800 text-white rounded-full w-3 h-3 flex items-center justify-center p-1 text-[0.6rem] right-0 top-0">
              {(vehicle && 1) || 0}
            </span>
          </div>
          <div
            onClick={() =>
              router.push(
                `/boutique?par_vehicule=1&year=${vehicle?.year}&make=${vehicle?.make}&model=${vehicle?.model}&submodel=${vehicle?.subModel}`
              )
            }
            className="ml-5 lg:ml-0 flex py-1.5 rounded-md lg:px-2 lg:text-sm text-xs !whitespace-nowrap !text-ellipsis overflow-hidden cursor-pointer items-center gap-x-1 justify-start"
          >
            <span className="truncate font-normal text-sm">
              <Tooltip content={vehicle?.name}>
                {vehicle?.name}
              </Tooltip>
            </span>
          </div>
        </div>

        <div className="flex text-xs gap-x-2 items-center justify-center pl-2 ml-2 border-l border-gray-200">
          <span
            className="text-blue-500 uppercase font-semibold cursor-pointer text-[10px] xl:text-xs  whitespace-nowrap"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            {vehicle ? (
              <Tooltip className="normal-case" content="Changer le véhicule">
                Changer
              </Tooltip>
            ) : (
              "Ajouter un vehicule"
            )}
          </span>
        </div>
      </div>
      {vehicle?.count && (
        <div className="bg-gray-100 p-3 py-1 rounded-b-md text-sm text-center font-bold">
          Piéces compatibles: &nbsp;
          {vehicle && vehicle.count}
        </div>
      )}

      <>
        <Modal
          show={openModal}
          onClose={() => {
            setOpenModal(false);
            setVehicles([]);
          }}
          dismissible
          position="center"
          size={"4xl"}
        >
          <Modal.Header>
            {vehicle ? "Gérer votre véhicule" : "Rechercher un vehicule"}{" "}
            Nav select
          </Modal.Header>
          <Modal.Body>
            {!vehicle && (
              <>
                <SelectVehicle setVehicules={setVehicles} />
                <div className="mt-8 flex gap-2 flex-wrap">
                  {vehicles &&
                    vehicles.map((item) => (
                      <div
                        key={item.term_id}
                        className="bg-black rounded-xl px-2 py-4 flex flex-col w-[180px] w-[180px]"
                      >
                        {item.subModel === "" && (
                          <p className="text-xs font-bold text-white">
                            Piéces genériques de ce modéle
                          </p>
                        )}
                        <p className="font-semibold text-sm text-rachel-red-600 min-h-[70px] ">
                          {item.name}

                          <span className="block font-semibold text-xs text-rachel-red-700">
                            {item.year}
                          </span>
                        </p>

                        {data?.user?.vehicles?.some(
                          (v) => v?.id === item.term_id
                        ) ? (
                          <span className="mt-auto text-gray-300 text-xs">
                            Déjà sur votre liste
                          </span>
                        ) : (
                          <span
                            className="mt-auto text-white text-xs hover:cursor-pointer hover:underline"
                            onClick={() => handleAddVehicle(item)}
                          >
                            Choisir
                          </span>
                        )}
                      </div>
                    ))}
                </div>
              </>
            )}
            <div className="mt-4 flex gap-2">
              {vehicle && (
                <div
                  key={vehicle.term_id}
                  className="bg-black rounded-xl p-8 flex flex-col"
                >
                  <p className="text-lg text-xl font-semibold text-rachel-red-700">
                    {vehicle.name}
                  </p>
                  <span className="text-sm text-gray-100 mb-3">
                    {vehicle.slug}
                  </span>
                  <div className="flex items-center gap-x-3 justify-between">
                    <span
                      className="text-white text-xs hover:cursor-pointer hover:underline"
                      onClick={() => {
                        router.push(
                          `/boutique?par_vehicule=1&year=${vehicle.year}&make=${vehicle.make}&model=${vehicle.model}&submodel=${vehicle.subModel}`
                        );
                      }}
                    >
                      Magasiner
                    </span>
                    <TrashIcon
                      className="w-5 h-5 text-rachel-red-700 cursor-pointer"
                      onClick={() => handleDelete()}
                    />
                  </div>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              color="gray"
              onClick={() => setOpenModal(false)}
              text={"Fermer"}
            />
          </Modal.Footer>
        </Modal>
      </>
      <ToastContainer className="!z-[99999999999999]" />
    </div>
  );
}
