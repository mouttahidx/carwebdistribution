import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const categoriesLevel2 = [
  {
    name: "Accessoires pour Camions",
    slug: "accessoires-pour-camions",
    children: [{ id: 51515, name: "Accessoires" }],
  },
  {
    name: "Camping et Loisirs",
    slug: "camping-et-loisirs",
    children: [
      { id: 51512, name: "Accessoires" },
      { id: 51511, name: "Équipement de Camping" },
    ],
  },
  // {
  //   name: "Électrique",
  //   slug: "electrique",
  //   children: [
  //     { id: 51501, name: "Composants Électriques" },
  //     { id: 51502, name: "Câblage et Connecteurs" },
  //   ],
  // },
  {
    name: "Embrayage et Transmission",
    slug: "embrayage-et-transmission",
    children: [
      { id: 51477, name: "Composants d'Embrayage" },
      { id: 51478, name: "Pièces de Transmission" },
      { id: 51479, name: "Autres Accessoires de Transmission" },
    ],
  },
  {
    name: "Extérieur",
    slug: "exterieur",
    children: [
      { id: 51494, name: "Composants de Carrosserie" },
      { id: 51495, name: "Protection Extérieure" },
      { id: 51492, name: "Éclairage" },
      { id: 51493, name: "Autres Accessoires Extérieurs" },
    ],
  },
  {
    name: "Freins",
    slug: "freins",
    children: [
      { id: 51475, name: "Accessoires de freins" },
      { id: 51474, name: "Freins à Disque" },
      { id: 51476, name: "Freins à Tambour" },
    ],
  },
  {
    name: "Intérieur",
    slug: "interieur",
    children: [
      { id: 51499, name: "Accessoires Intérieurs" },
      { id: 51498, name: "Autres Accessoires Intérieurs" },
      { id: 51500, name: "Électronique Intérieure" },
      { id: 51497, name: "Garnitures Intérieures" },
      { id: 51496, name: "Sièges" },
    ],
  },
  {
    name: "Moteur",
    slug: "moteur",
    children: [
      { id: 51480, name: "Refroidissement et Lubrification" },
      { id: 51481, name: "Distributeur et Allumage" },
      { id: 51482, name: "Système d'Échappement" },
      { id: 51483, name: "Système de Carburant" },
      { id: 51485, name: "Capteurs" },
    ],
  },
  {
    name: "Outils et Équipement",
    slug: "outils-et-equipement",
    children: [
      { id: 51507, name: "Outils de diagnostic et de programmation" },
      { id: 51504, name: "Outils à main et kits" },
      { id: 51508, name: "Quincaillerie et autres" },
      { id: 51506, name: "Crics et supports" },
      { id: 51516, name: "Autres outils et accessoires" },
      { id: 51517, name: "Autres outils et équipements" },
      { id: 51505, name: "Outils de atelier" },
    ],
  },
  {
    name: "Remorque et remorquage",
    slug: "remorque-et-remorquage",
    children: [
      { id: 51510, name: "Accessoires de remorquage" },
      { id: 51509, name: "Composants de remorque" },
    ],
  },
  {
    name: "Roues et Pneus",
    slug: "roues-et-pneus",
    children: [
      { id: 29345, name: "Jantes", parent: false },
      { id: 51513, name: "Roues" },
      { id: 51514, name: "Pneus" },
      { id: 50373, name: "Écrous et boulons" ,parent: false},
    ],
  },
  {
    name: "Suspension et Direction",
    slug: "suspension-et-direction",
    children: [
      { id: 51490, name: "Composants d'Alignement" },
      { id: 51487, name: "Essieu et Transmission" },
      { id: 51488, name: "Autres Pièces de Suspension et Direction" },
      { id: 51489, name: "Composants de Direction" },
      { id: 51487, name: "Composants de Suspension" },
    ],
  },
].sort((a, b) => (a.name > b.name ? 1 : -1));


export default function CategoriesNav() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  return (
    <div className="hidden md:flex top-0 md:sticky duration-200 bg-gray-100 w-full shadow-md z-20 border-t">
      <div className="flex justify-evenly gap-x-4 py-2 items-center flex-wrap gap-y-4 container mx-auto ">
        {categoriesLevel2.map((item, index) => (
          <Dropdown
            key={index}
            renderTrigger={() => (
              <div className="text-sm w-fit cursor-pointer">{item.name}</div>
            )}
            color={"transparent"}
            size={"small"}
            inline={true}
          >
            {item.children?.length > 0 &&
              item.children.map((child) => (
                <Dropdown.Item key={child.id}>
                  <Link
                    href={
                      "/boutique/?categorie_id=" +
                      child.id +
                      (child?.parent === false ? "" : "&parent_category=1")
                    }
                  >
                    {child.name}
                  </Link>
                </Dropdown.Item>
              ))}
          </Dropdown>
        ))}
        <span
          onClick={() => {
            window.location.href = "/recherche-pneu/";
          }}
          className={
            router.pathname === "/recherche-pneu"
              ? "cursor-pointer text-sm text-center max-w-[120px] lg:max-w-full text-black "
              : "cursor-pointer text-sm text-center max-w-[120px] lg:max-w-full  hover:text-black duration-200"
          }
        >
          Recherche de pneus
        </span>
      </div>
    </div>
  );
}
