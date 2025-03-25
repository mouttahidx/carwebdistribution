import { CheckCircleIcon } from "@heroicons/react/24/solid";
export default function Benefits() {
  const benefits = [
    {
      main: "Sélection étendue",
      benefit:
        "Vaste inventaire de pièces automobiles, vous garantissant de trouver la pièce exacte dont vous avez besoin pour votre véhicule.",
    },
    {
      main: "Des prix compétitifs",
      benefit:
        "Des offres exceptionnelles et des prix compétitifs sur des pièces automobiles de haute qualité, vous aidant à économiser de l'argent.",
    },
    {
      main: "Achats pratiques",
      benefit:
        "Interface de site Web facile à utiliser avec des fonctionnalités de recherche et de navigation intuitives, rendant votre expérience d'achat sans tracas.",
    },
    {
      main: "Livraison rapide",
      benefit:
        "Service de livraison fiable et rapide, garantissant que vos pièces automobiles vous parviennent rapidement et efficacement.",
    },
  ];
  return (
    <section className="py-16 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-4">
      {benefits.map((item, index) => (
        <div
          className="px-4 py-3 lg-p-4 border bg-gray-600 rounded-lg"
          key={index}
        >
          <div className="flex gap-x-3 items-center">
            <div className="p-2 bg-white rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-rachel-red-800" />
            </div>
            <h3 className="text-white font-semibold">{item.main}</h3>
          </div>
          <p className="mt-4 text-white text-sm font-light">{item.benefit}</p>
        </div>
      ))}
    </section>
  );
}
