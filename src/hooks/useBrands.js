import { api } from "@/lib/api";
import axios from "axios";
import useSWR from "swr";

const fetcher = async ([url, page]) => {
  const response = await axios.get(
    process.env.NEXT_PUBLIC_WEBSITE_URL +
      "wp-json/wc/v3/marque/all?per_page=" +
      30 +
      "&page=" +
      page
  );
  return { data: response.data, headers: response.headers };
};

const useBrands = (page) => {
  const { data, error, isLoading } = useSWR(["brands/all", page], fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 60000 * 60 * 24 * 10,
    keepPreviousData: true,
  });

  return {
    brands: data || [],
    isLoading,
    isError: error,
  };
};

export default useBrands;
