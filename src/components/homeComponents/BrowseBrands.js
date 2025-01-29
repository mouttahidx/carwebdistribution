import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import 'aos/dist/aos.css'
import Aos from "aos";

export default function BrowseBrands({ brands }) {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
  }, [])

  return (
    <section className="my-24">
      <div className="flex justify-between mb-8">
         <h2 className="font-semibold text-lg lg:text-2xl uppercase">Naviguer les marques</h2>
        <Button text={"Voir les Marques"} className="text-sm" onClick={()=>{router.push('/marques')}} />
      </div>
      <div className="content-start grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 grid-rows-1 gap-2 py-8 bg-red gap-y-4">
        {brands && brands?.length > 0 && brands?.map((brand,index) => (
          <Link
          data-aos="fade-in" data-aos-duration="800" data-aos-delay={index * 300}

            key={brand.id}
            href={"/boutique?marque="+brand.id}
            className="flex flex-col justify-start rounded-md items-center py-10 bg-center bg-contain hover:shadow-2xl bg-no-repeat shadow-black duration-500 border"
            style={{backgroundImage: brand?.image ? `url('${process.env.NEXT_PUBLIC_WEBSITE_URL+"wp-content/uploads/"+brand.image}')` : `url('/slider1.jpg')`}}
          >
{/*             
            <h2
              className="bg-black text-white bg-opacity-10 font-bold w-fit p-2 lg:text-xl text-center rounded min-w-[100px] shadow-md border border-gray-600" style={{textShadow:"1px 1px 10px black hidden"}}
              dangerouslySetInnerHTML={{ __html: brand.name }}
              
            /> */}
          </Link>
        ))}
      </div>
    </section>
  );
}
