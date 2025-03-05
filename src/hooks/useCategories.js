import { api, getStructuredCategories } from "@/lib/api";
import useSWR from "swr";

const PER_PAGE = 100;

const fetchCategories = async ([url, page, parent]) => {
  const { data, headers } = await api.get(url, { parent, per_page: 20, page });
  return { data, headers };
};

const fetchAllCategories = async () => {
  let page = 1;
  const allCategories = [];

  while (true) {
    try {
      const { data: categories } = await api.get("products/categories", {
        page,
        per_page: PER_PAGE,
        orderby: "name",
        order: "asc",
        exclude: [51193],
      });

      if (!categories.length) break;
      allCategories.push(...categories);
      if (categories.length < PER_PAGE) break;
      page++;
    } catch (error) {
      console.error("Error fetching categories:", error.response?.data || error);
      break;
    }
  }

  return allCategories;
};

const fetchStructuredCategories = async () => {
  const response = await fetchAllCategories();
  const structuredCategories = getStructuredCategories(response);
  return { 
    data: structuredCategories?.data, 
    headers: structuredCategories?.headers 
  };
};

const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000 * 60 * 24 * 10,
  keepPreviousData: true,
};


const useCategories = (page, parent = 0) => {
  const { data: regularData, error: regularError, isLoading: regularLoading } = useSWR(
    parent !== 0 ? ["products/categories", page, parent] : null,
    fetchCategories,
    defaultSWROptions
  );

  const { data: structuredData, error: structuredError, isLoading: structuredLoading } = useSWR(
    parent === 0 ? "structured-categories" : null,
    fetchStructuredCategories,
    defaultSWROptions
  );

  return {
    categories: parent !== 0 ? regularData || [] : structuredData || [],
    isLoading: parent !== 0 ? regularLoading : structuredLoading,
    isError: parent !== 0 ? regularError : structuredError,
  };
};

export default useCategories;
