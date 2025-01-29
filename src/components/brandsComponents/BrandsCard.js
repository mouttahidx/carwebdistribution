import Link from "next/link";

export default function BrandsCard({ item }) {

  return (
    <Link
      key={item.id}
      href={"/boutique/" +"?marque="+item.id}
      className="flex flex-col justify-start items-start w-full bg-no-repeat bg-contain bg-black bg-center rounded-md h-[250px] hover:shadow-lg duration-700 hover:shadow-rachel-black-500"
      style={{backgroundImage: item?.image ? `url('${process.env.NEXT_PUBLIC_WEBSITE_URL+"wp-content/uploads/"+item.image}')` : `url('/slider1.jpg')`}}
    >
     

      <div className="p-5 py-4 w-full rounded-md bg-black h-full bg-opacity-30 flex items-center justify-center hover:bg-opacity-60 duration-500">
        
        <h2
            className="text-lg text-white font-semibold text-center"
            dangerouslySetInnerHTML={{ __html: item.name }}
          />

 
      
      </div>
    </Link>
  );
}
