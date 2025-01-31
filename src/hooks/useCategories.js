import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const useCategories = () => {
  const { data, error } = useSWR(process.env.NEXT_PUBLIC_WEBSITE_URL+"/wp-json/wc/v3/products/categories", fetcher, { revalidateOnFocus: false });

  return {
    categories: data || [],
    isLoading: !error && !data,
    isError: error,
  };
};

export default useCategories;
