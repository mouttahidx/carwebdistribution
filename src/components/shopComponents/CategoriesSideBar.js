import { categoriesWithChildren } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoriesSideBar() {
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      async function fetchCategories() {
        const res = await categoriesWithChildren();
        setCategories(res);
        console.log(res)
      }
    //   fetchCategories();
    }, []);
  
    return (
      <aside className="w-full p-4 bg-gray-100 min-h-screen">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <ul>
          {categories.map((parent) => (
            <li key={parent.id} className="mb-2">
              <Link href={`/category/${parent.slug}`} className="font-semibold">
                {parent.name} - {parent.count}
              </Link>
              {parent.children.length > 0 && (
                <ul className="ml-4 mt-2 text-gray-600">
                  {parent.children.map((child) => (
                    <li key={child.id}>
                      <Link href={`/category/${child.slug}`}>{child.name} - {child.count}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </aside>
    );
  }