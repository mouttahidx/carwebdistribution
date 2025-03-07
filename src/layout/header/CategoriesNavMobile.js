import { Dropdown, Sidebar } from "flowbite-react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { categoriesLevel2 } from "./CategoriesNav";

export default function CategoriesNavMobile() {
  const router = useRouter();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

 
  return (
    <Sidebar
      aria-label="Sidebar with multi-level dropdown example"
      className="w-full -mt-2"
    >
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {categoriesLevel2.map((item, index) => (
            <Sidebar.Collapse
              icon={() => <></>}
              label={item.name}
              key={index}
              className="!text-sm"
            >
              {item.children?.length > 0 &&
                item.children.map((child) => (
                  <Sidebar.Item
                    key={child.id}
                    href={
                      "/boutique/?categorie_id=" +
                      child.id +
                      "&parent_category=1"
                    }
                    className="!text-sm text-left"
                  >
                    {child.name}
                  </Sidebar.Item>
                ))}
              
            </Sidebar.Collapse>
          ))}
          <Sidebar.Item
                
                key={"pneus"}
                href={"/recherche-pneu/"}
                className="!text-sm text-left"
              >
                <span
                  onClick={() => {
                    window.location.href = "/recherche-pneu/";
                  }}
                  className={
                    router.pathname === "/recherche-pneu"
                      ? "cursor-pointer text-sm text-center max-w-[120px] lg:max-w-full text-black "
                      : "cursor-pointer text-sm text-center max-w-[120px] lg:max-w-full  hover:text-black duration-200"
                  }
                >
                  Outil de recherche de pneus
                </span>
              </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
