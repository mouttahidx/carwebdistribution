import Image from "next/image";
import Link from "next/link";

export default function CategoryThumb({ category }) {
  return (
    <Link
      href={"boutique/?categorie_id="+category.id}
      className="flex flex-col justify-start items-center"
    >
      <Image
        src="/logo-image.png"
        width={70}
        height={70}
        alt={category.name + " Cover"}
        unoptimized
      />
      <h2
        className="text-xs text-center mt-3"
        dangerouslySetInnerHTML={{ __html: category.name }}
      />
    </Link>
  );
}
