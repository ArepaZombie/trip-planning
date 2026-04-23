import { useEffect, useState } from "react";
import { packingItemsList } from "../../utils";
import Icon from "../Utils/Icon";
import type { PackingItem } from "../../types";

export default function ItemsUpdate({
  itemsActive,
  handleItemsUpdate,
}: {
  itemsActive: PackingItem[];
  handleItemsUpdate: any;
}) {
  const [listItems, setListItems] = useState<PackingItem[]>(packingItemsList);

  useEffect(() => {
    let updateList = packingItemsList.map((item) => {
      return {
        ...item,
        checked: itemsActive.some((i) => i.icon === item.icon),
      };
    }) as PackingItem[];
    setListItems(updateList);
  }, []);

  useEffect(() => {
    handleItemsUpdate(
      "packingItems",
      listItems.reduce<PackingItem[]>((acc, i) => {
        if (i.checked) acc.push({ ...i, checked: false });
        return acc;
      }, []),
    );
  }, [listItems]);

  const checkHandler = (icon: string) => {
    let updateList = listItems.map((item) => {
      return {
        ...item,
        checked: item.icon === icon ? !item.checked : item.checked,
      };
    }) as PackingItem[];
    setListItems(updateList);
  };

  return (
    <div className="inventory-panel items-update-panel">
      {listItems.map((item) => (
        <div
          key={item.label}
          className={`icon-cell ${item.checked && "checked"}`}
          onClick={() => checkHandler(item.icon)}
        >
          <Icon
            icon={item.icon}
            color={item.checked ? "--blue-light" : "--blue-dark"}
          />
        </div>
      ))}
    </div>
  );
}
