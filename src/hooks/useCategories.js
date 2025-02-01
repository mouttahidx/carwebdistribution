import { api } from "@/lib/api";
import useSWR from "swr";

const fetcher = async ([url, page]) => {
  const response = await api.get(url, { per_page: 20, page: page });
  return { data: response.data, headers: response.headers };
};

const useCategories = (page) => {
  const { data, error, isLoading } = useSWR(
    ["products/categories", page],
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
