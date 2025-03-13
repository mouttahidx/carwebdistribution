import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000 * 60 * 24 * 10,
  keepPreviousData: true,
};

const useCategoryBrandsCount = (id) => {  
  const { data, error, mutate } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/wp-json/wc/v3/products/category-brands?category_id=${id}`
      : null,
    fetcher,
    defaultSWROptions
  );


  return {
    BrandsPerCategory: data,
    BrandsPerCategoryLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useCategoryBrandsCount;
