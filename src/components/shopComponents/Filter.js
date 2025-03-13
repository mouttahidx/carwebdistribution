"use client";
import React, { useEffect, useState } from "react";
import CategoriesFilter from "./CategoriesFilter";
import BrandsFilter from "./BrandsFilter";
import { Button, Modal } from "flowbite-react";
import { useRouter } from "next/router";

import { useVehicleContext } from "../Providers";

export default function Filter({
  categoryUpdate,
  productsLoading,
  activeCategories,
  brands,
  brandsUpdate,
  activeBrands,
}) {
  const router = useRouter();
  const [isMobile, setMobile] = useState(null);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openBrandsModal, setOpenBrandsModal] = useState(false);
  const [reset, setReset] = useState(0);
  const {vehicle,deleteVehicle} = useVehicleContext();

  useEffect(() => {
    if (isMobile === null) {
      setMobile(window.innerWidth < 1024);
    }
  }, [isMobile]);

  useEffect(()=>{
    
  },[reset])

  if (isMobile) {
    return (
      <div className="w-full bg-white rounded-md">
        {vehicle && (
          <div className="flex flex-col gap-y-2 mb-8">
            <p className="font-medium">Retirer le filtrage par voiture</p>
            <Button
              className="bg-rachel-red-700 py-0"
              onClick={() => {
                deleteVehicle()
                document.cookie = `user-vehicle=; path=/; max-age=0; SameSite=Lax`;
                router.query.par_vehicule = 0;
                router.push("/boutique");
              }}
            >
              Retirer
            </Button>
          </div>
        )}
        <div className="bg-white rounded-lg p-2 border w-full grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="w-full">
            <Button onClick={() => setOpenCategoryModal(true)} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500">Catégories</Button>
            <Modal show={openCategoryModal} onClose={() => setOpenCategoryModal(false)}>
              <Modal.Header>Filtrage par catégorie</Modal.Header>
              <Modal.Body className="p-2">
                <CategoriesFilter
                  categoryUpdate={categoryUpdate}
                  productsLoading={productsLoading}
                  activeCategories={activeCategories}
                  reset={reset}
                />
              </Modal.Body>
              <Modal.Footer>
              <Button onClick={() => setOpenCategoryModal(false)} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500">Terminer</Button>
              <Button onClick={() => {setReset(curr => (curr +1))}} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500" disabled={productsLoading}>Effacer</Button>
              </Modal.Footer>
            </Modal>
          </div>
          <div className="w-full">
            <Button onClick={() => setOpenBrandsModal(true)} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500">Marques</Button>
            <Modal show={openBrandsModal} onClose={() => setOpenBrandsModal(false)}>
              <Modal.Header>Filtrage par marque</Modal.Header>
              <Modal.Body  className="p-2">
                <BrandsFilter
                  activeBrands={activeBrands}
                  brandsUpdate={brandsUpdate}
                  brands={brands}
                  productsLoading={productsLoading}
                  reset={reset}
                />
              </Modal.Body>
              <Modal.Footer>
              <Button onClick={() => setOpenBrandsModal(false)} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500">Terminer</Button>
              <Button onClick={() => {setReset(curr => (curr +1))}} className="w-full bg-transparent text-black border border-gray-950 hover:!bg-rachel-red-800 hover:text-white duration-500" disabled={productsLoading}>Effacer</Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full bg-white rounded-md">
    
      {vehicle && (
        <div className="flex flex-col gap-y-2 mb-8">
          <p className="font-medium">Retirer le filtrage par voiture</p>
          <Button
            className="bg-rachel-red-700 py-0"
            onClick={() => {
              deleteVehicle();
              document.cookie = `user-vehicle=; path=/; max-age=0; SameSite=Lax`;
              router.query.par_vehicule = 0;
              router.push("/boutique");
            }}
          >
            Retirer
          </Button>
        </div>
      )}
      <div className="bg-white rounded-lg p-2 border w-full flex lg:flex-col">
        <div className="w-6/12 lg:w-full">
          <CategoriesFilter
            categoryUpdate={categoryUpdate}
            productsLoading={productsLoading}
            activeCategories={activeCategories}
          />

        </div>
        <div className="w-6/12 lg:w-full">
          <hr className="hidden lg:block my-3" />
          <BrandsFilter
            activeBrands={activeBrands}
            brandsUpdate={brandsUpdate}
            brands={brands}
            productsLoading={productsLoading}
            activeCategory={activeCategories?.length > 0 && activeCategories[0]}
          />
        </div>
      </div>
    </div>
  );
}
