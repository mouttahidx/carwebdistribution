import useSWR from "swr";
import axios from "axios";
import { useVehicleContext } from "@/components/Providers";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000 * 60 * 24 * 10,
  keepPreviousData: true,
};

const usePartsCount = () => {
  const {vehicle,setVehicle} = useVehicleContext()
  
  const { data, error, mutate } = useSWR(
    vehicle
      ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/wp-json/wc/v3/user/vehicle/parts?slug=${vehicle?.slug}`
      : null,
    fetcher,
    defaultSWROptions
  );


  const { categories, total } = data || {};
  return {
    categoriesCount: categories,
    isCountLoading: !error && !data,
    total: total,
    isError: error,
    mutate,
  };
};

export default usePartsCount;
