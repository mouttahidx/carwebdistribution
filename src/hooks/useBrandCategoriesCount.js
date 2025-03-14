import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000 * 60 * 24 * 10,
  keepPreviousData: true,
};

const useBrandCategoriesCount = (id) => {  
  const { data, error, mutate } = useSWR(
    id
      ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}wp-json/wc/v3/products/brand-categories-count?brand_id=${id}`
      : null,
    fetcher,
    defaultSWROptions
  );

  console.log(data)

  return {
    CategoriesPerBrandCount: data,
    CategoriesPerBrandCountLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useBrandCategoriesCount;
