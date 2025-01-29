import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SelectVehicle from "@/components/homeComponents/SelectVehicle";
import { ToastContainer, toast } from "react-toastify";
import { TrashIcon, WrenchIcon } from "@heroicons/react/24/solid";
import { FaCar, FaCarSide } from "react-icons/fa6";
import Image from "next/image";
export default function NavSelectVehicle() {
  const { data, status } = useSession();
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [vehicles, setVehicles] = useState(null);
  const [localVehicle, setLocalVehicle] = useState(null);

  useEffect(() => {
    if (status !== "authenticated" && status !== "loading") {
      if (typeof window !== "undefined") {
        const vehicle = localStorage.getItem("user-vehicle") || null;
        vehicle && setLocalVehicle(JSON.parse(vehicle));
      }
    }
  }, [status]);

  useEffect(() => {
    if (router.asPath === "/#select_vehicle") {
      setOpenModal(1);
    } else {
      setOpenModal(false);
    }
  }, [router]);

  const handleAddVehicle = (item) => {
    setLocalVehicle({
      id: item.term_id,
      name: item.name,
      year: item.year,
      make: item.make,
      model: item.model,
      subModel: item.subModel,
    });
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "user-vehicle",
        JSON.stringify({
          id: item.term_id,
          name: item.name,
          year: item.year,
          make: item.make,
          model: item.model,
          subModel: item.subModel,
        })
      );
      toast.success("Véhicule ajouté avec succès!");
    }
  };

  const handleDelete = () => {
    setLocalVehicle(null);
    localStorage.removeItem("user-vehicle");
  };

  if (status === "unauthenticated") {
    return (
      <div className="">
        {localVehicle ? (
          <div className="flex gap-x-2 items-center md:bg-gray-100 p-1 rounded-md w-full">
            <div className="relative w-8/12 lg:border-r md:border-gray-200 justify-between">
              <FaCar
                className="flex md:hidden w-8 rounded-full p-1 h-8 text-white cursor-pointer bg-rachel-red-700 "
                onClick={() => {
                  setOpenModal(true);
                }}
              />
              <div
                onClick={() =>
                  router.push(
                    `/boutique?par_vehicule=1&year=${localVehicle.year}&make=${localVehicle.make}&model=${localVehicle.model}&submodel=${localVehicle.subModel}`
                  )
                }
                className="hidden md:flex py-1.5 rounded-md lg:px-2 lg:text-sm text-xs !whitespace-nowrap !text-ellipsis overflow-hidden cursor-pointer items-center gap-x-1 justify-start"
              >
                <div className="relative hidden lg:flex items-center w-fit">
                  <Image
                    src="/car.svg"
                    className="w-10"
                    width={50}
                    height={50}
                  />
                  <span className="absolute bg-rachel-red-800 text-white rounded-full w-3 h-3 flex items-center justify-center p-1 text-[0.6rem] right-0 -top-1">
                    {localVehicle && 1}
                  </span>
                </div>
                <span className="truncate font-normal text-sm"> {localVehicle?.name}</span>
              </div>
            </div>

            <div className="hidden md:flex text-xs gap-x-2 items-center justify-center flex-1 w-4/12">
              <span
                className="text-blue-500 uppercase font-semibold cursor-pointer text-[10px] xl:text-xs"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                Changer
              </span>
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center">
            <FaCar
              className="md:hidden w-8 rounded-full p-1 h-8 text-white cursor-pointer bg-rachel-red-700"
              onClick={() => {
                setOpenModal(true);
              }}
            />
            <Button
              icon={false}
              text={
                <div className="flex items-center justify-start xl:gap-x-1">
                  Ajouter un vehicule <FaCar className="w-5 h-5 ml-1" />
                </div>
              }
              onClick={() => setOpenModal(1)}
              className="hidden md:flex !xl:px-1 !xl:text-sm !text-xs !px-2"
            />
          </div>
        )}
        <>
          <Modal
            show={openModal}
            onClose={() => {
              setOpenModal(false);
              setVehicles([]);
            }}
            size={"4xl"}
          >
            <Modal.Header>
              {localVehicle ? "Gérer votre véhicule" : "Rechercher un vehicule"}
            </Modal.Header>
            <Modal.Body>
              {!localVehicle && <SelectVehicle setVehicules={setVehicles} />}
              {!localVehicle && (
                <div className="mt-8 flex gap-2 flex-wrap">
                  {vehicles &&
                    vehicles.map((item) => (
                      <div
                        key={item.term_id}
                        className="bg-black rounded-xl px-2 py-4 flex flex-col md:w-[180px] w-[180px]"
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
              )}
              <div className="mt-4 flex gap-2">
                {localVehicle && (
                  <div
                    key={localVehicle.term_id}
                    className="bg-black rounded-xl p-8 flex flex-col"
                  >
                    <p className="text-lg md:text-xl font-semibold text-rachel-red-700">
                      {localVehicle.name}
                    </p>
                    <span className="text-sm text-gray-100 mb-3">
                      {localVehicle.slug}
                    </span>
                    <div className="flex items-center gap-x-3 justify-between">
                      <span
                        className="text-white text-xs hover:cursor-pointer hover:underline"
                        onClick={() => {
                          router.push(
                            `/boutique?par_vehicule=1&year=${localVehicle.year}&make=${localVehicle.make}&model=${localVehicle.model}&submodel=${localVehicle.subModel}`
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
        <ToastContainer className={"!z-[99999999999999]"} />
      </div>
    );
  }

  return (
    <div>
      {data?.user?.vehicles?.length > 0 ? (
        <div>
          <FaCar
            className="flex md:hidden w-8 rounded-full p-1 h-8 text-white cursor-pointer bg-rachel-red-700"
            onClick={() => router.push("/compte/vehicules")}
          />
          <p
            onClick={() =>
              router.push(
                `/boutique?par_vehicule=1&year=${data?.user?.vehicles[0]?.year}&make=${data?.user?.vehicles[0]?.make}&model=${data?.user?.vehicles[0]?.model}&submodel=${data?.user?.vehicles[0]?.subModel}`
              )
            }
            className="hidden md:flex bg-rachel-red-700 text-white py-1.5 rounded-md px-1 lg:text-sm text-xs w-fit max-w-[120px] !whitespace-nowrap !text-ellipsis overflow-hidden cursor-pointer"
          >
            {data?.user?.vehicles[0]?.name}
          </p>
        </div>
      ) : (
        <div>
          <FaCar
            className="flex md:hidden w-8 rounded-full p-1 h-8 text-white cursor-pointer bg-rachel-red-700"
            onClick={() => router.push("/compte/vehicules")}
          />
          <Button
            text={"Choisissez un vehicule"}
            onClick={() => router.push("/compte/vehicules")}
            className="hidden md:flex xl:px-1 xl:text-sm text-xs px-0"
          />
        </div>
      )}
    </div>
  );
}
