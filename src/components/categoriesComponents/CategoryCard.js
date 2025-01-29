import Link from "next/link";

export default function CategoryCard({ item }) {
  return (
    <Link
      key={item.id}
      href={"boutique/?categorie_id=" + item.id}
      className="flex flex-col justify-start items-start w-full bg-no-repeat bg-cover bg-center rounded-md h-[250px] hover:shadow-lg duration-700 hover:shadow-rachel-black-500"
      style={{
        backgroundImage: item.image
          ? `url('${item?.image?.src}')`
          : `url('/slider1.jpg')`,
      }}
    >
      <div className="p-5 py-4 w-full rounded-md bg-black h-full bg-opacity-30 flex justify-center hover:bg-opacity-60 duration-500 flex-col items-center">
        <h2
          className="text-lg text-white font-semibold text-center"
          dangerouslySetInnerHTML={{ __html: item.name }}
        />
        <span className="text-gray-300 text-xs text-center bg-black bg-opacity-50 p-1 rounded">{item.slug}</span>
      </div>
    </Link>
  );
}
