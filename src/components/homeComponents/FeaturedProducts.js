import Aos from "aos";
import ProductCard from "./ProductCard";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function FeaturedProducts({ products }) {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <section className="mt-16">
      <div>
        <h2 className="font-semibold text-lg lg:text-2xl uppercase">
          En vedette
        </h2>
      </div>
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  lg:grid-cols-6 grid-rows-1 gap-y-6 gap-x-3 lg:gap-x-4 pt-8 bg-red "
        data-aos="fade-in"
        data-aos-duration="500"
      >
        {products?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}
