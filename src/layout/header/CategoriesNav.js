import { Dropdown } from "flowbite-react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export const categoriesLevel2 = [
  {
    name: "Accessoires pour Camions",
    slug: "accessoires-pour-camions",
    children: [{ id: 51515, name: "Accessoires", img:"/img/categories/camion.webp" }],
  },
  {
    name: "Camping et Loisirs",
    slug: "camping-et-loisirs",
    children: [
      { id: 51512, name: "Accessoires",img:"/img/categories/camping_access.webp" },
      { id: 51511, name: "Équipement de Camping" ,img:"/img/categories/camping_equip.webp"},
    ],
  },
  {
    name: "Embrayage et Transmission",
    slug: "embrayage-et-transmission",
    children: [
      { id: 51479, name: "Autres Accessoires de Transmission" ,img:"/img/categories/access_transmition.webp"},
      { id: 51477, name: "Composants d'Embrayage", img:"/img/categories/embryage_components.webp" },
      { id: 51478, name: "Pièces de Transmission" ,img:"/img/categories/piece_transm.webp"},
    ],
  },
  {
    name: "Extérieur",
    slug: "exterieur",
    children: [
      { id: 51493, name: "Autres Accessoires Extérieurs" ,img:"/img/categories/access_exterior.webp" },
      { id: 51494, name: "Composants de Carrosserie" ,img:"/img/categories/carosserie_component.webp"},
      { id: 51197, name: "Déflecteur de toit ouvrant",parent:false ,img:"/img/categories/deflecteur_toit.webp"},
      { id: 51194, name: "Déflecteur de vitre latérale",parent:false ,img:"/img/categories/deflecteur_vitre.webp"},
      { id: 51492, name: "Éclairage" ,img:"/img/categories/eclairage.webp"},
      { id: 51199, name: "Kit de garde-boue" ,img:"/img/categories/kit_garde_boue.webp"},
      { id: 51201, name: "Pare-soleil de pare-brise" ,parent:false,img:"/img/categories/kit_pare_soleil.webp"},
    ],
  },
  {
    name: "Freins",
    slug: "freins",
    children: [
      { id: 51475, name: "Accessoires de freins",img:"/img/categories/access_frein.webp" },
      { id: 51474, name: "Freins à Disque",img:"/img/categories/frein_disque.webp" },
    ],
  },
  {
    name: "Intérieur",
    slug: "interieur",
    children: [
      { id: 51499, name: "Accessoires Intérieurs" ,img:"/img/categories/access_interieur.webp"},
      { id: 51498, name: "Autres Accessoires Intérieurs" ,img:"/img/categories/autre_access_interieur.webp"},
      { id: 51500, name: "Électronique Intérieure" ,img:"/img/categories/electric_interieur.webp"},
      { id: 51496, name: "Sièges" ,img:"/img/categories/siege.webp"},
    ],
  },
  {
    name: "Moteur",
    slug: "moteur",
    children: [
      { id: 51481, name: "Autres composants moteur" ,img:"/img/categories/autre_compo_moteur.webp"},
      { id: 51485, name: "Capteurs" ,img:"/img/categories/capteurs.webp"},
      { id: 51480, name: "Distributeur et allumage" ,img:"/img/categories/dist_allumage.webp"},
      { id: 51483, name: "Système de Carburant" ,img:"/img/categories/system_carburant.webp"},
      { id: 51482, name: "Système d'Échappement" ,img:"/img/categories/system_echappement.webp"},
    ],
  },
  {
    name: "Outils et Équipement",
    slug: "outils-et-equipement",
    children: [
      { id: 51516, name: "Autres outils et accessoires",img:"/img/categories/outils_equipement_autres.webp" },
      { id: 51517, name: "Autres outils et équipements",img:"/img/categories/outils_equipement_autres_equipements.webp" },
      { id: 51506, name: "Crics et supports",img:"/img/categories/crics.webp" },
      { id: 51504, name: "Outils à main et kits",img:"/img/categories/jantes.webp" },
      { id: 51505, name: "Outils de atelier",img:"/img/categories/outil_atelier.webp" },
      { id: 51507, name: "Outils de diagnostic et de programmation",img:"/img/categories/diagnostic.webp" },
      { id: 51508, name: "Quincaillerie et autres" ,img:"/img/categories/quinca.webp"},
    ],
  },
  {
    name: "Remorque et remorquage",
    slug: "remorque-et-remorquage",
    children: [
      { id: 51510, name: "Accessoires de remorquage",img:"/img/categories/access_remorquage.webp" },
      { id: 51509, name: "Composants de remorque",img:"/img/categories/compo_remorque.webp" },
    ],
  },
  {
    name: "Roues et Pneus",
    slug: "roues-et-pneus",
    children: [
      { id: 50373, name: "Écrous et boulons" ,parent: false ,img:"/img/categories/boulon.webp"},
      { id: 29345, name: "Jantes", parent: false,img:"/img/categories/jantes.webp" },
      { id: 51514, name: "Pneus" ,img:"/img/categories/pneu.webp"},
      { id: 51513, name: "Roues" ,img:"/img/categories/roue acier.webp"},
    ],
  },
  {
    name: "Suspension et Direction",
    slug: "suspension-et-direction",
    children: [
      { id: 51488, name: "Autres Pièces de Suspension et Direction",img:"/img/categories/autre_suspension.webp" },
      { id: 51490, name: "Composants d'Alignement",img:"/img/categories/compo_alignement.webp" },
      { id: 51489, name: "Composants de Direction" ,img:"/img/categories/compo_direction.webp"},
      { id: 51487, name: "Composants de Suspension",img:"/img/categories/compo_suspension.webp" },
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
