import Link from "next/link";

export default function TopNav() {
  return (
    <div className="flex justify-center lg:justify-end gap-x-3 md:gap-x-5 bg-rachel-black-950 w-full py-2 lg:px-8 px-1">
        <Link href={"/apropos"} className="text-white text-sm text-center">À propos</Link>
        <Link href={"/rabais_postaux"} className="text-white text-sm text-center">Rabais postaux</Link>
        <Link href={"/livraison-et-retour"} className="hidden md:inline text-white text-sm text-center">Livraison</Link>
        <Link href={"/garantie"} className="text-white text-sm text-center">Garantie</Link>
        <Link href={"/faq"} className="text-white text-sm text-center">FAQ</Link>
        <Link href={"/contact"} className="text-white text-sm text-center">Contact</Link>
    </div>
  )
}
