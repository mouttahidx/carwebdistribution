import { Modal } from "flowbite-react";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import SelectVehicle from "@/components/homeComponents/SelectVehicle";
import { ToastContainer, toast } from "react-toastify";
import { TrashIcon, WrenchIcon } from "@heroicons/react/24/solid";
import { FaCar } from "react-icons/fa";
import ErrorBoundary from "../ErrorBoundary";

export default function HomeSelectVehicle() {
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

  const handleAddVehicle = (item) => {
    console.log(item)
   
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

  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      setOpenModal(true);
    }
  }, [vehicles]);

  return (
    <div>
      <ErrorBoundary>
        <SelectVehicle setVehicules={setVehicles} />
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
              {/* {!localVehicle && <SelectVehicle setVehicules={setVehicles} />} */}
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
      </ErrorBoundary>
    </div>
  );
}
