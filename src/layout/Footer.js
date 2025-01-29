import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const dt = new Date();
  return (
    <footer className=" border-t ">
      <div className=" lg:container mx-auto flex flex-wrap lg:flex-nowrap lg:gap-8 gap-x-6 gap-y-8 p-6 lg:justify-evenly">
        <div className="flex flex-col w-full  md:w-1/2 lg:w-4/12 ">
          <Link href="/" className="flex flex-col items-center gap-x-2 w-fit">
            <Image
              src="/logo-dark.png"
              width="0"
              height="0"
              sizes="100vw"
              className="w-full max-w-[90px] lg:max-w-[130px] h-auto"
              alt="Car web distribution logo"
              priority="false"
            />
          </Link>
          <p className="text-gray-500 max-w-[360px]">
            Découvrez notre boutique en ligne pour des pièces et roues de
            voiture de qualité, livrées rapidement. Trouvez ce dont vous avez
            besoin pour entretenir ou personnaliser votre véhicule dès
            maintenant !
          </p>
        </div>
        <div className="flex lg:justify-center w-full md:w-1/3 lg:w-4/12">
          <div className="flex flex-col ">
            <p className="mb-3">Information</p>
            <div className="grid lg:grid-cols-2 gap-y-1 ">
              <Link
                href={"/compte/informations"}
                className="text-gray-500 hover:text-rachel-black-950"
              >
                Mon compte
              </Link>
              <Link
                href="/livraison-et-retour"
                className="text-gray-500 hover:text-rachel-black-950"
              >
                Livraison & Retours
              </Link>
              <Link
                href="/garantie"
                className="text-gray-500 hover:text-rachel-black-950"
              >
                Garantie
              </Link>
              <Link
                href="/apropos"
                className="text-gray-500 hover:text-rachel-black-950"
              >
                À propos
              </Link>
              <Link
                href={"/faq"}
                className="text-gray-500 hover:text-rachel-black-950"
              >
                FAQ
              </Link>
              <Link
                href="/financement"
                className="text-gray-500 hover:text-rachel-black-950"
              >
                Financement
              </Link>
              <Link
                href="/contact"
                className="text-gray-500 hover:text-rachel-black-950"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full md:w-1/2 lg:w-4/12">
          <p className="mb-3">Contact</p>
          <div className="text-gray-500">
            <p>
              858 chemin du rivage Saint-Antoine-sur-Richelieu <br />
              QC , j0L1 R0
            </p>
            <p>+1 514-883-0691</p>
            <p>+1 800-883-0691</p>
            <p>info@carwebdistribution.ca</p>
          </div>
        </div>
      </div>
      {/* company infos */}
      <div className="border-t lg:container mx-auto flex flex-wrap lg:flex-nowrap lg:gap-8 gap-x-6 gap-y-8 p-6 lg:justify-evenly">
        <p className="">Dénomination: Car Web Distribution Inc</p>
        <p className="">NEQ/Numéro d’enregistrement société: 1178476462 </p>
        <p className="">
          Adresse officielle de la société: 44 Boucher, Saint-Hilaire QC J3H 2T6
        </p>
      </div>
      <div className="border-t py-4 px-6  flex justify-between">
        <p className="text-gray-500 text-sm">
          {process.env.NEXT_PUBLIC_WEBSITE_TITLE} © {dt.getFullYear()}, Tous
          droits réservés
        </p>
        <div className="flex gap-x-4">
          <Link
            className="text-gray-500 text-sm"
            href="/politiques-de-confidentialite"
          >
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
