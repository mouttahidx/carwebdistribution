import {  browseCategories } from "@/lib/api";
import { useEffect, useState } from "react";
import { Tabs } from "flowbite-react";

import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/router";
import ContentLoader from "react-content-loader";
import Aos from "aos";
import 'aos/dist/aos.css'

export default function BrowseCategories() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const customTheme = {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center",
      styles: {
        underline:
          "flex-wrap -mb-px border-b border-gray-200 dark:border-gray-700 ",
      },
      tabitem: {
        base: "flex items-center justify-center p-4 rounded-t-lg text-base font-base first:ml-0 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500  focus:outline-none",
        styles: {
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "text-rachel-red-700  border-b-2 border-rachel-red-700 active dark:text-rachel-red-700 dark:border-rachel-red-700",
              off: "text-black border-b-2 border-transparent hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabpanel: "py-3",
  };

  const DoorDashFavorite = (props) => (
    <ContentLoader
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="catBrowse"
      viewBox="0 0 211 211"
      className="max-w-fit"
      {...props}
    >
      <rect x="12" y="58" rx="2" ry="2" width="211" height="211" />
    </ContentLoader>
  );

  const getCats = async () => {
    setLoading(true);
    try {
      const { data } = await browseCategories();
      setCategories(data);
    } catch (error) {}

    setLoading(false);
  };

  useEffect(() => {
    getCats();
    Aos.init();
  }, []);

  if (!loading && categories?.length < 1) {
    return null;
  }


  return (
    <section className="mt-16 mb-20"  data-aos="fade-in" data-aos-duration="1500">
      <div className="flex justify-between items-start mb-8">
        <h2 className="font-semibold text-lg lg:text-2xl uppercase ">
          Naviguer les catégories
        </h2>
        <Button
          text={"Magasiner"}
          className="text-sm"
          onClick={() => {
            router.push("/boutique");
          }}
        />
      </div>

      {loading && (
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-5 gap-y-4 mt-10 lg:max-w-5xl mx-auto !overflow-x-hidden">
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
          <DoorDashFavorite />
        </div>
      )}

      {!loading && (
        <div className="w-full flex justify-center">
          <Tabs.Group
            aria-label="Default tabs"
            style="underline"
            className="w-full bg-white rounded-md"
            theme={customTheme}
          >
            {categories.map((cat) => {
              if (cat.parent === 0) {
                return (
                  <Tabs.Item title={cat.name} key={cat.id}>
                    <section className="w-full  flex justify-center">
                      <div className="grid grid-cols-4 sm:grid-cols-5 lg:grid-cols-5  gap-x-0 gap-y-10 mt-10 max-w-2xl ">
                        {categories.map(
                          (subcat) =>
                            subcat.parent === cat.id && (
                              <Link
                                key={subcat.id}
                                href={"boutique/?categorie_id=" + subcat.id}
                                className="flex flex-col justify-start items-center md:px-6 w-full rounded-md duration-700 group "
                              >
                                <div className="w-full relative aspect-square overflow-hidden">
                                  <Image
                                    src={subcat?.image?.src || "/slider1.jpg"}
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    className="w-full h-auto"
                                    alt={subcat.name}
                                    unoptimized
                                  />
                                </div>
                                <h2
                                  className="text-base mt-0 text-black  text-center group-hover:underline"
                                  dangerouslySetInnerHTML={{
                                    __html: subcat.name,
                                  }}
                                />
                              </Link>
                            )
                        )}
                      </div>
                    </section>
                  </Tabs.Item>
                );
              }
              return [];
            })}
          </Tabs.Group>
        </div>
      )}
    </section>
  );
}
