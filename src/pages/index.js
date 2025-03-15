import { getSelectedBrands, getFeaturedProducts } from "@/lib/api";
import BrowseCategories from "@/components/homeComponents/BrowseCategories";
import BrowseBrands from "@/components/homeComponents/BrowseBrands";
import FeaturedProducts from "@/components/homeComponents/FeaturedProducts";
import Layout from "@/layout";
import Benefits from "@/components/homeComponents/Benefits";
import TireSearch from "@/components/homeComponents/TireSearch";
import Head from "next/head";
import Tiles from "@/components/homeComponents/Tiles";
import TiresBrands from "@/components/homeComponents/TiresBrands";
import PreloadCategories from "@/components/PreloadCategories";
import NewSlider from "@/components/homeComponents/NewSlider";

export default function Home({ brands, products }) {
  return (
    <Layout>
      <Head>
        <title key={"page accueil"}>{`${
          process.env.NEXT_PUBLIC_WEBSITE_TITLE || "Check .ENV"
        }`}</title>
      </Head>
      {/* <SimpleSlider data={products} /> */}
      <NewSlider />
      <main className="w-full flex justify-center !overflow-x-hidden">
        <section className="container px-1 ">
          {/* <HomeSelectVehicle /> */}
          <BrowseCategories />
          <FeaturedProducts products={products} />
          {/* <CreateAccount /> */}
          <TireSearch />
          <Tiles data-aos="fade-up" />
          <TiresBrands />
          {brands.length > 0 && <BrowseBrands brands={brands} />}
          <Benefits />
          <PreloadCategories />
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
