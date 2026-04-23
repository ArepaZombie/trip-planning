export const setNestedValue = (obj: any, keys: string[], value: any): any => {
  console.log("entro en utils");
  if (!keys.length) return obj;
  console.log(keys);
  if (!obj) return {}; // guard
  console.log(obj);
  const [first, ...rest] = keys;
  return {
    ...obj,
    [first]: rest.length
      ? setNestedValue(obj[first] ?? {}, rest, value)
      : value,
  };
};

export const packingItemsList = [
  { label: "Agua", icon: "fa-bottle-water" },
  { label: "Snacks", icon: "fa-cookie-bite" },
  { label: "Zapatillas", icon: "fa-shoe-prints" },
  { label: "Pastillas", icon: "fa-pills" },
  { label: "Bloqueador solar", icon: "fa-sun" },
  { label: "Gorra", icon: "fa-hat-cowboy" },
  { label: "Impermeable", icon: "fa-umbrella" },
  { label: "Ropa extra", icon: "fa-shirt" },
  { label: "Condones", icon: "fa-shield-heart" },
  { label: "Linterna", icon: "fa-flashlight" },
  { label: "Ropa de Baño", icon: "fa-person-swimming" },
];
