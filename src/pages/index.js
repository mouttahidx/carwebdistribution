import { getSelectedBrands, getFeaturedProducts } from "@/lib/api";
import BrowseCategories from "@/components/homeComponents/BrowseCategories";
import BrowseBrands from "@/components/homeComponents/BrowseBrands";
import FeaturedProducts from "@/components/homeComponents/FeaturedProducts";
import SimpleSlider from "@/components/homeComponents/Slider";
import Layout from "@/layout";
import Benefits from "@/components/homeComponents/Benefits";
import TireSearch from "@/components/homeComponents/TireSearch";
import Head from "next/head";
import Tiles from "@/components/homeComponents/Tiles";
import CreateAccount from "@/components/homeComponents/CreateAccount";

import TiresBrands from "@/components/homeComponents/TiresBrands";
import HomeSelectVehicle from "@/components/homeComponents/HomeSelectVehicle";

export default function Home({ brands, products }) {
  return (
    <Layout>
      <Head>
        <title key={"page accueil"}>{`${
          process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      <SimpleSlider data={products} />
      <main className="w-full flex justify-center !overflow-x-hidden">
        <section className="container px-1 ">
          <HomeSelectVehicle />
          <CreateAccount />
          <TireSearch />
          <Tiles data-aos="fade-up" />
          <TiresBrands />
          {/* <BrowseCategories /> */}
          {brands.length > 0 && <BrowseBrands brands={brands} />}
          <FeaturedProducts products={products} />
          <Benefits />
          {/* <PromoProducts /> */}
        </section>
      </main>
    </Layout>
  );
}

export async function getStaticProps() {
  const brands = await getSelectedBrands();
  const products = await getFeaturedProducts();

  return {
    props: {
      brands: brands || [],
      products: products || [],
    },
    revalidate: 30,
  };
}
