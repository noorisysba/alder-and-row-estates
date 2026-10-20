import { Property } from "@/data/properties";
export type Filters = {
  location: string;
  min: string;
  max: string;
  beds: string;
  type: string;
  sort: string;
  furnishing: string;
  availability: string;
  transaction: string;
  saved: string;
};
export const emptyFilters: Filters = {
  location: "",
  min: "",
  max: "",
  beds: "",
  type: "",
  sort: "featured",
  furnishing: "",
  availability: "",
  transaction: "",
  saved: "",
};
export function filterProperties(
  items: Property[],
  f: Filters,
  saved: string[] = [],
) {
  const result = items.filter(
    (p) =>
      (!f.location ||
        `${p.area} ${p.address} ${p.postcode}`
          .toLowerCase()
          .includes(f.location.toLowerCase().trim())) &&
      (!f.min || p.price >= Number(f.min)) &&
      (!f.max || p.price <= Number(f.max)) &&
      (!f.beds ||
        (f.beds === "studio" ? p.beds === 0 : p.beds >= Number(f.beds))) &&
      (!f.type || p.type === f.type) &&
      (!f.furnishing || p.furnishing === f.furnishing) &&
      (!f.availability || p.status === f.availability) &&
      (!f.transaction || p.transaction === f.transaction) &&
      (!f.saved || saved.includes(p.id)),
  );
  if (f.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (f.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  if (f.sort === "size") result.sort((a, b) => b.size - a.size);
  return result;
}
