import { api } from "@/lib/api";
import useSWR from "swr";

const fetcher = async ([url, page,parent]) => {
  const response = parent !== 0 ? await api.get(url, { parent,per_page: 20, page: page }) : await api.get(url, { per_page: 20, page: page });
  return { data: response.data, headers: response.headers };
};

const useCategories = (page,parent = 0) => {
  const { data, error, isLoading } = useSWR(
    ["products/categories", page,parent],
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000 * 60 * 24 * 10,
      keepPreviousData: true,
    }
  );
  

  return {
    categories: data || [],
    isLoading,
    isError: error,
  };
};

export default useCategories;
