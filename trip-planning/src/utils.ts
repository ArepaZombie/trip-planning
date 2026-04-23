import type { PackingItem } from "./types";

export const setNestedValue = (obj: any, keys: string[], value: any): any => {
  if (!keys.length) return obj;
  if (!obj) return {}; // guard
  const [first, ...rest] = keys;
  return {
    ...obj,
    [first]: rest.length
      ? setNestedValue(obj[first] ?? {}, rest, value)
      : value,
  };
};

export const packingItemsList: PackingItem[] = [
  { label: "Agua", icon: "fa-bottle-water", checked: false },
  { label: "Snacks", icon: "fa-cookie-bite", checked: false },
  { label: "Zapatillas", icon: "fa-shoe-prints", checked: false },
  { label: "Pastillas", icon: "fa-pills", checked: false },
  { label: "Bloqueador solar", icon: "fa-sun", checked: false },
  { label: "Gorra", icon: "fa-hat-cowboy", checked: false },
  { label: "Sombrilla", icon: "fa-umbrella", checked: false },
  { label: "Impermeable", icon: "fa-droplet-slash", checked: false },
  { label: "Ropa extra", icon: "fa-shirt", checked: false },
  { label: "Condones", icon: "fa-shield-heart", checked: false },
  { label: "Linterna", icon: "fa-lightbulb", checked: false },
  { label: "Ropa de Baño", icon: "fa-person-swimming", checked: false },
];
