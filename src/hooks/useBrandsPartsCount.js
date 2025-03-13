import useSWR from "swr";
import axios from "axios";
import { useVehicleContext } from "@/components/Providers";

const defaultSWROptions = {
  revalidateOnFocus: false,
  dedupingInterval: 60000 * 60 * 24 * 10,
  keepPreviousData: true,
};

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useBrandsPartsCount = () => {
  const {vehicle} = useVehicleContext();
  const { data, error, mutate } = useSWR(
    vehicle
      ? `${process.env.NEXT_PUBLIC_WEBSITE_URL}/wp-json/wc/v3/user/vehicle/brand/parts?slug=${vehicle.slug}`
      : null,
    fetcher,
    defaultSWROptions
  );

  return {
    brandsCount: data,
    isCountLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export default useBrandsPartsCount;
