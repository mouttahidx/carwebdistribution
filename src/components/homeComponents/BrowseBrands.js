import Link from "next/link";
import Button from "../Button";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "aos/dist/aos.css";
import Aos from "aos";
import Image from "next/image";

export default function BrowseBrands({ brands }) {
  const router = useRouter();
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section className="my-24">
      <div className="flex justify-between mb-8">
        <h2 className="font-semibold text-lg lg:text-2xl uppercase">
          Naviguer les marques
        </h2>
        <Button
          text={"Voir les Marques"}
          className="text-sm"
          onClick={() => {
            router.push("/marques");
          }}
        />
      </div>
      <div className="content-start grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 grid-rows-1 gap-2 py-8 bg-red gap-y-4">
        {brands &&
          brands?.length > 0 &&
          brands?.map((brand, index) => (
            <Link
              data-aos="fade-in"
              data-aos-duration="800"
              data-aos-delay={index * 300}
              key={brand.id}
              href={"/boutique?marque=" + brand.id}
            >
              <Image
                src={brand?.image ? process.env.NEXT_PUBLIC_WEBSITE_URL+"wp-content/uploads/"+brand.image : '/slider1.jpg'}
                alt={"marque "+brand.name}
                width={250}
                height={150}
                className="hover:shadow-2xl bg-no-repeat h-[100px] shadow-black duration-500 border object-contain object-center"
              />
            </Link>
          ))}
      </div>
    </section>
  );
}
