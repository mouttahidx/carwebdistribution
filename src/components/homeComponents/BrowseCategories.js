import { useEffect } from "react";
import { Tabs } from "flowbite-react";

import Link from "next/link";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/router";
import Aos from "aos";
import "aos/dist/aos.css";
import { categoriesLevel2 } from "@/layout/header/CategoriesNav";

export default function BrowseCategories() {
  const router = useRouter();
  const customTheme = {
    base: "w-full",
    tablist: {
      base:"w-full overflow-x-scroll [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500",
      tabitem: {
        base: "!text-sm p-2 min-w-[110px] !flex justify-center items-center rounded-t-lg text-base font-base disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500  focus:outline-none",
         styles: {
          // underline: {
          //   active: {
          //     on: "",
          //     off: "",
          //   },
          // },
        },
      },
    },
    tabitemcontainer:{
      base:"pt-8 "
    },
    tabpanel: "py-3",
  };
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <section
      className="mt-16 mb-20"
      data-aos="fade-in"
      data-aos-duration="1500"
    >
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

      <div className="w-full flex justify-center">
        <Tabs variant="fullWidth" theme={customTheme}>
          {categoriesLevel2.map((parent) => (
            <Tabs.Item title={parent.name} key={parent.slug}>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-8 justify-center">
                {parent?.children.map((child) => (
                  <Link
                    href={
                      "/boutique/?categorie_id=" +
                      child.id +
                      (child?.parent === false ? "" : "&parent_category=1")
                    }
                    className="text-center group flex flex-col gap-y-5"
                    key={child.id}
                  >
                    <Image
                      src={child?.img}
                      width={200}
                      height={300}
                      alt={"categorie : "+child.name}
                      className="group-hover:scale-105 duration-500 bg-cover w-full h-[100px] md:h-[150px]  object-contain"
                    />
                    <h3 className="text-sm">{child.name}</h3>
                  </Link>
                ))}
              </div>
            </Tabs.Item>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
