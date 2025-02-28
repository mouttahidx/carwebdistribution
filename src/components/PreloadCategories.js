import useCategories from "@/hooks/useCategories";

export default function PreloadCategories() {
  const {
    categories: { data, headers },
    isLoading,
  } = useCategories(1, 0);

  return <></>;
}
